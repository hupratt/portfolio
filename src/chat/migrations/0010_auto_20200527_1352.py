# Generated by Django 3.0.6 on 2020-05-27 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0009_contact_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='image_file',
            field=models.ImageField(blank=True, help_text='(optional) profile pic', null=True, upload_to=''),
        ),
    ]
