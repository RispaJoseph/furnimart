# Generated by Django 4.2.7 on 2023-12-14 07:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appmart', '0005_cartorder_wishlist_cartorderproducts_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartorderproducts',
            name='order',
        ),
        migrations.DeleteModel(
            name='CartOrder',
        ),
        migrations.DeleteModel(
            name='CartOrderProducts',
        ),
    ]
