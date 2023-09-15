import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Endereco } from '../../model/usuario.model';

interface EditFormProps {
  item: Endereco | null;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onInputChange: (field: string, value: string) => void;
}

const EditForm: React.FC<EditFormProps> = ({
  item,
  onSaveEdit,
  onCancelEdit,
  onInputChange,
}) => {
  return (
    <View>
      <TextInput
        label="Morada"
        value={item?.morada || ''}
        onChangeText={(text) => onInputChange('morada', text)}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      <TextInput
        label="Designação"
        value={item?.designacao || ''}
        onChangeText={(text) => onInputChange('designacao', text)}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      <TextInput
        label="ID Zona"
        value={item?.id_zona.toString() || ''}
        onChangeText={(text) => onInputChange('id_zona', text)}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      <TextInput
        label="Nome da Zona"
        value={item?.nome_zona || ''}
        onChangeText={(text) => onInputChange('nome_zona', text)}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />

      <Button mode="contained" onPress={onSaveEdit}>
        Salvar
      </Button>
      <Button mode="outlined" onPress={onCancelEdit}>
        Cancelar
      </Button>
    </View>
  );
};

export default EditForm;
