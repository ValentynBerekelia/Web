using Microsoft.EntityFrameworkCore;
using SeniorCursor.API.Models;

namespace SeniorCursor.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Plan> Plans { get; set; }
    public DbSet<User> Users { get; set; }
<<<<<<< HEAD
=======
    public DbSet<Cursor> Cursors { get; set; }
    public DbSet<Package> Packages { get; set; }
    public DbSet<CursorType> CursorTypes { get; set; }
>>>>>>> add dashboard and fix home page

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed admin user
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword("admin"),
                Role = "Admin"
            }
        );

        // Seed initial plans
        modelBuilder.Entity<Plan>().HasData(
            new Plan
            {
                Id = 1,
                Price = "10грн (не гроші)",
                Title = "🔸 Базова",
                Features = new List<string>
                {
                    "Доступ до основних функцій",
                    "Обмежена кількість проєктів",
                    "Підтримка на email"
                }
            },
            new Plan
            {
                Id = 2,
                Price = "60грн (тоже не гроші)",
                Title = "🔸 Стандартна",
                Features = new List<string>
                {
                    "Усі функції базової версії",
                    "Розширені можливості",
                    "Пріоритетна підтримка"
                }
            },
            new Plan
            {
                Id = 3,
                Price = "∞",
                Title = "🔸 Преміум",
                Features = new List<string>
                {
                    "Повний функціонал",
                    "Необмежені проєкти",
                    "Персональний менеджер",
                    "Ексклюзивні оновлення"
                }
            }
        );
<<<<<<< HEAD
=======

        // Seed initial packages
        modelBuilder.Entity<Package>().HasData(
            new Package
            {
                Id = 1,
                Name = "Базовий пакет",
                Description = "Базовий набір курсорів",
                Price = 10
            },
            new Package
            {
                Id = 2,
                Name = "Стандартний пакет",
                Description = "Розширений набір курсорів",
                Price = 20
            },
            new Package
            {
                Id = 3,
                Name = "Преміум пакет",
                Description = "Повний набір курсорів",
                Price = 30
            }
        );

        // Seed initial cursor types
        modelBuilder.Entity<CursorType>().HasData(
            new CursorType
            {
                Id = 1,
                Name = "Стандартний",
                Description = "Звичайний курсор"
            },
            new CursorType
            {
                Id = 2,
                Name = "Анімований",
                Description = "Анімований курсор"
            },
            new CursorType
            {
                Id = 3,
                Name = "Тематичний",
                Description = "Тематичний курсор"
            }
        );

        modelBuilder.Entity<Cursor>()
            .HasOne(c => c.Package)
            .WithMany(p => p.Cursors)
            .HasForeignKey(c => c.PackageId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Cursor>()
            .HasOne(c => c.Type)
            .WithMany(t => t.Cursors)
            .HasForeignKey(c => c.CursorTypeId)
            .OnDelete(DeleteBehavior.Restrict);
>>>>>>> add dashboard and fix home page
    }
} 