from django.urls import path

from . import views

urlpatterns = [
    path("", views.default_view, name="default"),
    path("<str:video_id>/", views.get_youtube_video_data, name="data")
]
