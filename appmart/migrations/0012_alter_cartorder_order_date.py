# Generated by Django 4.2.7 on 2023-12-25 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appmart', '0011_coupon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartorder',
            name='order_date',
            field=models.DateTimeField(),
        ),
    ]
