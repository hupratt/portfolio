from django import forms



class EmailPostForm(forms.Form):
    firstname = forms.CharField(max_length=250, required=True)
    lastname = forms.CharField(max_length=250, required=True)
    email = forms.EmailField(required=True)
    message = forms.CharField(max_length=2500, required=False)
    reason = forms.CharField(max_length=250, required=True)
    sendcc = forms.BooleanField(required=True) 
    price = forms.IntegerField(max_value=10001, min_value=-1)
    urgency = forms.CharField(max_length=250, required=True)
    subject = forms.CharField(max_length=250, required=True)
