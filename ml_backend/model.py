import torch

model = None
transform = None

def get_model_and_transform():
    global model, transform
    if model is None or transform is None:
        import torchvision.models as models
        import torchvision.transforms as transforms

        model = models.resnet18(pretrained=True)  # Smaller model
        model = torch.nn.Sequential(*list(model.children())[:-1])  # Remove final classifier
        model.eval()

        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
    return model, transform
