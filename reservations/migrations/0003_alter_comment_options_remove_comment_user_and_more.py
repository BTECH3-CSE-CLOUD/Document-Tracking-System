# Generated by Django 5.0 on 2025-06-11 18:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0002_alter_reservation_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={},
        ),
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.RemoveField(
            model_name='reservation',
            name='user',
        ),
    ]
