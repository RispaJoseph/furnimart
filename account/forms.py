from django import forms
from django.contrib.auth.forms import UserCreationForm
from account.models import User

class SignUpForm(UserCreationForm):
    # password2 = forms.CharField(label='Confirm Password (again)',
    #                             widget=forms.PasswordInput)
    first_name = forms.CharField(max_length=30,widget=forms.TextInput(attrs= {"placeholder":"First Name"}), required=True, help_text='Required. 30 characters or fewer.')
    last_name = forms.CharField(max_length=30,widget=forms.TextInput(attrs= {"placeholder":"Last Name"}), required=True, help_text='Required. 30 characters or fewer.')
    email = forms.EmailField(max_length=254,widget=forms.EmailInput(attrs= {"placeholder":"Email"}), required=True, help_text='Required. Enter a valid email address.')
    password1 = forms.CharField(max_length=30,widget=forms.PasswordInput(attrs= {"placeholder":"Password"}), required=True, help_text='Required. 30 characters or fewer.')
    password2 = forms.CharField(max_length=30,widget=forms.PasswordInput(attrs= {"placeholder":"Confirm Password"}), required=True, help_text='Required. 30 characters or fewer.')
    username = forms.CharField(max_length=30,widget=forms.TextInput(attrs= {"placeholder":"Username"}), required=True, help_text='Required. 30 characters or fewer.')
    class Meta:
        model = User
        fields = ['username','first_name','last_name', 'email']
        labels = {'email' : 'Email'}