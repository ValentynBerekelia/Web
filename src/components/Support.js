import React from 'react';
import { Container, Typography, Box, Card, CardContent, TextField, Button, Grid } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

function Support() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Тут буде логіка відправки форми
    alert('Ваше повідомлення відправлено! Ми зв\'яжемося з вами найближчим часом.');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500, mb: 4 }}>
        Підтримка
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
                Зв'яжіться з нами
              </Typography>
              <Typography variant="body1" paragraph>
                Якщо у вас виникли питання або проблеми, будь ласка, заповніть форму нижче, і наша команда підтримки зв'яжеться з вами найближчим часом.
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Ваше ім'я"
                  margin="normal"
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Тема"
                  margin="normal"
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Повідомлення"
                  multiline
                  rows={4}
                  margin="normal"
                  required
                  sx={{ mb: 3 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    textTransform: 'none',
                    px: 4,
                  }}
                >
                  Надіслати
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
                Контактна інформація
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Email:</strong> support@seniorcursor.com
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Телефон:</strong> +380 XX XXX XX XX
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Час роботи:</strong> Пн-Пт, 9:00 - 18:00
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Адреса:</strong> м. Київ, вул. Прикладна, 1
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Support; 