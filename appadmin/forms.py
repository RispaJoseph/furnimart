from django import forms
from appmart.models import Product

class CreateProductForm(forms.ModelForm):
    
            
    class Meta:
        model = Product
        fields =['title','category','old_price','price','description','stock']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'