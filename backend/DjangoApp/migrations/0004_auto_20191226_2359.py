# Generated by Django 2.2.6 on 2019-12-26 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DjangoApp', '0003_auto_20191226_2340'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='phone',
            field=models.CharField(default='Enter', max_length=30),
        ),
        migrations.AddField(
            model_name='order',
            name='phone',
            field=models.CharField(default='Enter', max_length=30),
        ),
    ]