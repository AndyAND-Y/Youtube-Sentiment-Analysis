from django.urls import path
from . import views


urlpatterns = [
    path("", views.default_view, name="default"),
    path("<str:video_id>/", views.get_ytb_video_data, name="data"),
    path("<str:video_id>/sentiment", views.get_ytb_comms, name="sentiment")
]
