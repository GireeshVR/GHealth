from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import NutritionSerializer

class NutritionCreateView(APIView):
    def post(self, request):
        data = request.data.get('meals', {})
        date = request.data.get('date')

        # Validate all meals have values
        for meal, details in data.items():
            if not all(details.values()):
                return Response(
                    {"error": f"Please enter all details for {meal}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        saved_items = []
        for meal, details in data.items():
            details['meal'] = meal
            details['date'] = date
            serializer = NutritionSerializer(data=details)
            if serializer.is_valid():
                serializer.save()
                saved_items.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"success": saved_items}, status=status.HTTP_201_CREATED)
