from django.shortcuts import render, redirect
from .forms import UserRegisterForm, ProfileUpdateForm
from django.contrib.auth import login,authenticate
from django.contrib import messages
from .forms import UserLoginForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import UserCreationForm


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('index')  # Redirect to a page after login
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'login_form': form})

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Redirect to login page after successful registration
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'register_form': form})

# def register(request):
#     if request.method == 'POST':
#         form = UserRegisterForm(request.POST)
#         # profile_form = ProfileUpdateForm(request.POST, request.FILES)
#         if form.is_valid() :
#             user = form.save()
#             # profile = profile_form.save(commit=False)
#             # profile.user = user
#             # profile.save()
#             login(request, user)
#             messages.success(request, f'Your account has been created! You are now logged in.')
#             return redirect('login')
#     else:
#         form = UserRegisterForm()
#         profile_form = ProfileUpdateForm()
#     return render(request, 'register.html', {'form': form, 'profile_form': profile_form})

# def login_view(request):
#     if request.method == 'POST':
#         form = UserLoginForm(data=request.POST)
#         if form.is_valid():
#             username = form.cleaned_data.get('username')
#             password = form.cleaned_data.get('password')
#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 messages.success(request, f'Welcome back, {username}!')
#                 return redirect('index')  # Redirect to your game's home page
#             else:
#                 messages.error(request, 'Invalid username or password.')
#         else:
#             messages.error(request, 'Invalid username or password.')
#     else:
#         form = UserLoginForm()
#     return render(request, 'login.html', {'form': form})