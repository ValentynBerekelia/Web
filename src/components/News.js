import React from 'react';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';

function News() {
  // Приклад новин (в майбутньому можна завантажувати з API)
  const news = [
    {
      id: 1,
      title: 'Оновлення Senior Cursor 2.0',
      date: '15.03.2024',
      content: 'Ми раді представити нову версію Senior Cursor з покращеним інтерфейсом та новими функціями.'
    },
    {
      id: 2,
      title: 'Нові курсори доступні',
      date: '10.03.2024',
      content: 'Додано нову колекцію курсорів для різних операційних систем.'
    },
    {
      id: 3,
      title: 'Покращення продуктивності',
      date: '05.03.2024',
      content: 'Оптимізовано роботу програми для швидшого відгуку та меншого використання ресурсів.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500, mb: 4 }}>
        Новини
      </Typography>
      <Grid container spacing={3}>
        {news.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {item.date}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {item.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default News; 