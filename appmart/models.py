from django.db import models
from shortuuidfield import ShortUUIDField
from django.utils.html import mark_safe
from account.models import User
from decimal import Decimal
from django.utils import timezone


STATUS_CHOICE = (
  ("processing", "Processing"),
  ("shipped", "Shipped"),
  ("delivered", "Delivered"),
  ("Cancel", "Cancel")
) 

RATING = (
  (1,"⭐☆☆☆☆"),
  (2,"⭐⭐☆☆☆"),
  (3,"⭐⭐⭐☆☆"),
  (4,"⭐⭐⭐⭐☆"),
  (5,"⭐⭐⭐⭐⭐")
)
  


# def user_directory_path(instance,filename):
#   return 'user_{0}/{1}'.format(instance.user.id, filename)

def user_directory_path(instance, filename):
    if instance.user and instance.user.id:
        return 'user_{0}/{1}'.format(instance.user.id, filename)
    else:
        # Handle the case when user or user.id is None
        return 'user_unknown/{0}'.format(filename)


class Category(models.Model):
    cid = ShortUUIDField(unique=True, max_length=20)
    title = models.CharField(max_length=100, default="Autoparts")
    image = models.ImageField(upload_to='category', default="category.jpg")
    is_blocked = models.BooleanField(default=False)

    


    class Meta:
        verbose_name_plural = "Categories"

    def category_image(self):
        if self.image:
          return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))
        else:
           return "NO Image Available"
    def __str__(self):
        return self.title
    

class Tags(models.Model):
  pass

    

    
    
class Product(models.Model):
  pid = ShortUUIDField(unique =True, max_length = 20)
  user = models.ForeignKey(User, on_delete = models.SET_NULL,null =True)
  category = models.ForeignKey(Category, on_delete = models.SET_NULL,null = True, related_name ="category")
  
  title = models.CharField(max_length = 100,default = "Fresh pear")
  image = models.ImageField(upload_to=user_directory_path, default = "product.jpg")
  description = models.TextField(null =True, blank =True, default = "This is the product")
  
  price = models.DecimalField(max_digits =10, decimal_places =2, default = 1.99 )
  old_price = models.DecimalField(max_digits =10, decimal_places =2, default = 2.99)
  stock = models.IntegerField(default=1)
  specifications = models.TextField(null =True, blank =True)
  # tags = models.ForeignKey(Tags, on_delete = models.SET_NULL, null =True)
  
  
  
  status = models.BooleanField(default=True)
  in_stock = models.BooleanField(default=True)
  featured = models.BooleanField(default=False)
  digital = models.BooleanField(default=False)  

    
  sku = ShortUUIDField(unique =True,max_length = 20)
  date = models.DateTimeField(auto_now_add =True)
  updated = models.DateTimeField(null=True, blank=True)

  class Meta:
    verbose_name_plural = "Products"
    
  def product_image(self):
    return mark_safe('<img src= "%s" width="50" height= "50" />' % (self.image.url))
  
  def __str__(self):
      return self.title
    
  def get_percentage(self):
    new_price = (self.price /self.old_price) * 100
    return new_price
    

class ProductImages(models.Model):
  Images = models.ImageField(upload_to="products-images", default = "product.jpg")
  product = models.ForeignKey(Product, related_name="p_images", on_delete = models.SET_NULL,null =True)
  date = models.DateField(auto_now_add =True)
  
  class Meta:
    verbose_name_plural = "Product Images"
  

####################cart, Order, OrderItems, address################ 

class CartOrder(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  price = models.DecimalField(max_digits=10, decimal_places=2, default="1.99")
  paid_status = models.BooleanField(default=False)
  order_date = models.DateTimeField(auto_now_add=True)
  product_status = models.CharField(choices=STATUS_CHOICE, max_length=30, default="processing")

  class Meta:
    verbose_name_plural = "Cart Order"


class CartOrderProducts(models.Model):
  order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
  invoice_no = models.CharField(max_length=200)
  product_status = models.CharField(max_length=200)
  item = models.CharField(max_length=200)
  image = models.CharField(max_length=200)
  qty = models.IntegerField(default=0)
  price = models.DecimalField(max_digits=10, decimal_places=2, default="1.99")
  total = models.DecimalField(max_digits=10, decimal_places=2, default="1.99")

  class Meta:
    verbose_name_plural = "Cart Order Items"

  def category_image(self):
        if self.image:
          return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))
       

  def order_img(self):
    return mark_safe('<img src="/media/%s" width="50" height="50" />' % (self.image))


class Address(models.Model):
  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  mobile = models.CharField(max_length=300, null=True)
  address = models.CharField(max_length=100, null=True)
  status = models.BooleanField(default=False)

  class Meta:
    verbose_name_plural = "Address"


# class wishlist(models.Model):
#   user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#   product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#   date = models.DateTimeField(auto_now_add=True)

#   class Meta:
#     verbose_name_plural = "wishlists"

#   def __str__(self):
#     return self.product.title


class Wishlist_model(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "wishlists"

    def __str__(self):
        return self.product.title


class wallet(models.Model):
  user=models.ForeignKey(User,on_delete=models.CASCADE)
  Amount =models.DecimalField(max_digits=10,decimal_places=2,default=1.99)
  
  class Meta:
    verbose_name_plural="Wallet"
    
  def __str__(self):
    return self.user.email 



class Coupon(models.Model):
  code=models.CharField(max_length=50,unique=True)
  discount=models.PositiveIntegerField(help_text='discount in percentage')
  active=models.BooleanField(default=True)
  active_date=models.DateField()
  expiry_date=models.DateField()
  created_date=models.DateTimeField(auto_now_add=True)
  
  
  def __str__(self):
     return self.code
  


# ......................Product Offer..........................

class ProductOffer(models.Model):
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    active = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.discount_percentage}% Discount"

    def save(self, *args, **kwargs):
        # Ensure discount_percentage is Decimal type
        if not isinstance(self.discount_percentage, Decimal):
            self.discount_percentage = Decimal(str(self.discount_percentage))
        super().save(*args, **kwargs)



class Banner(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='banners/')
    description1 = models.TextField(blank=True, null=True)
    description2 = models.TextField(blank=True, null=True)
    description3 = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
      return self.title

    def update_status(self):
        today = timezone.now().date()
        return self.start_date <= today <= self.end_date