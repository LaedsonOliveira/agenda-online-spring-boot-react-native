import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ImagePickerProps {
    onImageSelected: (uri: string) => void;
    currentImage?: string;
    size?: number;
}

export default function ImagePickerComponent({ onImageSelected, currentImage, size = 100 }: ImagePickerProps) {
    const [image, setImage] = useState<string | null>(currentImage || null);

    const pickImage = async () => {
        // Pedir permissão
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar foto');
            return;
        }

        // Abrir galeria
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onImageSelected(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de acesso à sua câmera para tirar foto');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onImageSelected(result.assets[0].uri);
        }
    };

    const showOptions = () => {
        Alert.alert(
            'Adicionar Foto',
            'Escolha uma opção',
            [
                { text: 'Tirar foto', onPress: takePhoto },
                { text: 'Escolher da galeria', onPress: pickImage },
                { text: 'Cancelar', style: 'cancel' },
            ]
        );
    };

    return (
        <TouchableOpacity onPress={showOptions} style={{ alignItems: 'center' }}>
            {image ? (
                <Image 
                    source={{ uri: image }} 
                    style={{ width: size, height: size, borderRadius: size / 2 }}
                />
            ) : (
                <View style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: '#f0f0f0',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Ionicons name="camera" size={size / 2} color="#999" />
                </View>
            )}
            <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#007AFF',
                borderRadius: 15,
                padding: 5,
            }}>
                <Ionicons name="add" size={15} color="#fff" />
            </View>
        </TouchableOpacity>
    );
}