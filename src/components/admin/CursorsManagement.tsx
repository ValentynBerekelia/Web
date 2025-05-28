import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Cursor, Package, CursorType } from '../../types/cursor';
import { Api } from '../../types/api';
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Grid,
  Tooltip,
  DialogContentText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

interface CursorFormData {
  packageId: string;
  cursorTypeId: string;
  cursorName: string;
  file?: File;
}

const CursorsManagement: React.FC = () => {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [cursorTypes, setCursorTypes] = useState<CursorType[]>([]);
  const [selectedCursor, setSelectedCursor] = useState<Cursor | null>(null);
  const [formData, setFormData] = useState<CursorFormData>({
    packageId: '',
    cursorTypeId: '',
    cursorName: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cursorsData, packagesData, cursorTypesData] = await Promise.all([
        (api as unknown as Api).getCursors(),
        (api as unknown as Api).getPackages(),
        (api as unknown as Api).getCursorTypes()
      ]);
      setCursors(cursorsData);
      setPackages(packagesData);
      setCursorTypes(cursorTypesData);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Помилка при завантаженні даних');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append('packageId', formData.packageId);
      data.append('cursorTypeId', formData.cursorTypeId);
      data.append('cursorName', formData.cursorName);
      if (formData.file) {
        data.append('file', formData.file);
      }

      if (selectedCursor) {
        await (api as unknown as Api).updateCursor(selectedCursor.id, data);
      } else {
        if (!formData.file) {
          setError('Будь ласка, виберіть файл курсора');
          setLoading(false);
          return;
        }
        await (api as unknown as Api).createCursor(data);
      }
      await loadData();
      setSelectedCursor(null);
      setFormData({
        packageId: '',
        cursorTypeId: '',
        cursorName: '',
      });
      setError('');
    } catch (error) {
      console.error('Error saving cursor:', error);
      setError('Помилка при збереженні курсора');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей курсор?')) {
      try {
        setLoading(true);
        await (api as unknown as Api).deleteCursor(id);
        await loadData();
        setError('');
      } catch (error) {
        console.error('Error deleting cursor:', error);
        setError('Помилка при видаленні курсора');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (cursor: Cursor) => {
    setSelectedCursor(cursor);
    setFormData({
      packageId: cursor.packageId.toString(),
      cursorTypeId: cursor.cursorTypeId.toString(),
      cursorName: cursor.cursorName,
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Управління курсорами
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {selectedCursor ? 'Редагувати курсор' : 'Додати новий курсор'}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Пакет</InputLabel>
                <Select
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleSelectChange}
                  label="Пакет"
                >
                  {packages.map(pkg => (
                    <MenuItem key={pkg.id} value={pkg.id.toString()}>
                      {pkg.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Тип курсора</InputLabel>
                <Select
                  name="cursorTypeId"
                  value={formData.cursorTypeId}
                  onChange={handleSelectChange}
                  label="Тип курсора"
                >
                  {cursorTypes.map(type => (
                    <MenuItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="cursorName"
                label="Назва курсора"
                value={formData.cursorName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                {selectedCursor ? 'Змінити файл курсора' : 'Виберіть файл курсора'}
                <input
                  type="file"
                  hidden
                  accept=".cur,.ani"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Вибраний файл: {formData.file.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={loading}
                fullWidth
              >
                {selectedCursor ? 'Зберегти зміни' : 'Додати курсор'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Список курсорів
      </Typography>
      
      <Grid container spacing={3}>
        {cursors.map(cursor => (
          <Grid item xs={12} sm={6} md={4} key={cursor.id}>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img
                    src={cursor.pathToIcon}
                    alt={cursor.cursorName}
                    style={{ width: 64, height: 64, marginBottom: 16 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {cursor.cursorName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Пакет: {cursor.package?.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Тип: {cursor.type?.name}
                  </Typography>
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(cursor)}
                    >
                      Редагувати
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(cursor.id)}
                    >
                      Видалити
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CursorsManagement; 