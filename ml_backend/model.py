import torchvision.models as models
import torchvision.transforms as transforms
import torch.nn as nn


model = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V2)  # Load pre-trained ResNet-50 model
model = nn.Sequential(*list(model.children())[:-1])  # Remove the last fully connected layer
model.eval()  # Set the model to evaluation mode

transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize the image to 224x224
    transforms.ToTensor(),  # Convert the image to a tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize the image
])