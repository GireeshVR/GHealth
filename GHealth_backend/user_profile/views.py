from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from dashboard.models import Nutrition
from .serializers import NutritionSerializer

# Get all nutrition data
class ProfileNutritionView(generics.ListAPIView):
    queryset = Nutrition.objects.all().order_by('-date')
    serializer_class = NutritionSerializer

# Delete a single nutrition entry
class NutritionDeleteView(APIView):
    def delete(self, request, pk):
        try:
            nutrition = Nutrition.objects.get(pk=pk)
            nutrition.delete()
            return Response({"detail": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Nutrition.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

# Edit a nutrition entry
class NutritionEditView(generics.RetrieveUpdateAPIView):
    queryset = Nutrition.objects.all()
    serializer_class = NutritionSerializer
    lookup_field = 'pk'
