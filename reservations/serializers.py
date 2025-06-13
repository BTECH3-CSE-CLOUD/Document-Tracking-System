from rest_framework import serializers
from .models import Table, Reservation, Comment

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'number', 'capacity', 'is_available']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at']
        read_only_fields = ['created_at']

class ReservationSerializer(serializers.ModelSerializer):
    table = TableSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    table_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Reservation
        fields = ['id', 'table', 'table_id', 'date', 'time', 
                 'number_of_guests', 'status', 'created_at', 'comments']
        read_only_fields = ['status', 'created_at']

    def validate_number_of_guests(self, value):
        if value <= 0:
            raise serializers.ValidationError("Number of guests must be greater than 0")
        return value

    def create(self, validated_data):
        table_id = validated_data.pop('table_id')
        try:
            table = Table.objects.get(id=table_id)
            if validated_data['number_of_guests'] > table.capacity:
                raise serializers.ValidationError("Number of guests exceeds table capacity")
            return Reservation.objects.create(table=table, **validated_data)
        except Table.DoesNotExist:
            raise serializers.ValidationError("Table not found") 