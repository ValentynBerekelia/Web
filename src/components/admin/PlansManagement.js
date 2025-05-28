import React, { useState, useEffect } from 'react';
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
  DialogContentText
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { plansService } from '../../services/api';

function PlansManagement() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    price: '',
    title: '',
    features: ''
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await plansService.getAll();
      setPlans(response.data);
      setError('');
    } catch (err) {
      setError('Помилка при завантаженні планів');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        price: plan.price,
        title: plan.title,
        features: plan.features.join('\n')
      });
    } else {
      setEditingPlan(null);
      setFormData({
        price: '',
        title: '',
        features: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPlan(null);
  };

  const handleSave = async () => {
    try {
      const updatedPlan = {
        ...formData,
        features: formData.features.split('\n').filter(f => f.trim()),
        id: editingPlan?.id
      };

      if (editingPlan) {
        await plansService.update(editingPlan.id, updatedPlan);
      } else {
        await plansService.create(updatedPlan);
      }

      handleClose();
      fetchPlans();
    } catch (err) {
      setError('Помилка при збереженні плану');
    }
  };

  const handleDeleteClick = (plan) => {
    setPlanToDelete(plan);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await plansService.delete(planToDelete.id);
      setDeleteConfirmOpen(false);
      setPlanToDelete(null);
      fetchPlans();
    } catch (err) {
      setError('Помилка при видаленні плану');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
          Управління тарифами
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          Додати тариф
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
                  {plan.title}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                  {plan.price}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {plan.features.map((feature, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        '&:before': {
                          content: '"•"',
                          color: 'primary.main',
                          mr: 1,
                        },
                      }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Tooltip title="Редагувати">
                  <IconButton
                    onClick={() => handleOpen(plan)}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Видалити">
                  <IconButton
                    onClick={() => handleDeleteClick(plan)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPlan ? 'Редагувати тариф' : 'Додати новий тариф'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Ціна"
            margin="normal"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Назва"
            margin="normal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Особливості (по одній на рядок)"
            margin="normal"
            multiline
            rows={4}
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Скасувати
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              textTransform: 'none',
              px: 3,
            }}
          >
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Підтвердження видалення</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ви впевнені, що хочете видалити тариф "{planToDelete?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ mr: 1 }}>
            Скасувати
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              px: 3,
            }}
          >
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PlansManagement; 