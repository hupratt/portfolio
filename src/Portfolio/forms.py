from django import forms



class EmailPostForm(forms.Form):
    firstname = forms.CharField(max_length=120, required=True)
    lastname = forms.CharField(max_length=120, required=True)
    email = forms.EmailField(required=True, max_length = 120)
    message = forms.CharField(max_length=2500, required=False)
    sendcc = forms.BooleanField(required=False) 
    pricerange = forms.CharField(max_length=120, required=True)
    urgency = forms.CharField(max_length=120)
    subject = forms.IntegerField(max_value=10, min_value=1, required=True)
    
