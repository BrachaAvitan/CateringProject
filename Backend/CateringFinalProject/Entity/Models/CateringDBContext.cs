using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entity.Models
{
    public partial class CateringDBContext : DbContext
    {
        public CateringDBContext()
        {
        }

        public CateringDBContext(DbContextOptions<CateringDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblCategories> TblCategories { get; set; }
        public virtual DbSet<TblDetailsEvent> TblDetailsEvent { get; set; }
        public virtual DbSet<TblDoseType> TblDoseType { get; set; }
        public virtual DbSet<TblMenuTypes> TblMenuTypes { get; set; }
        public virtual DbSet<TblProducts> TblProducts { get; set; }
        public virtual DbSet<TblProductsToRecipe> TblProductsToRecipe { get; set; }
        public virtual DbSet<TblRecipes> TblRecipes { get; set; }
        public virtual DbSet<TblRecipesToOrder> TblRecipesToOrder { get; set; }
        public virtual DbSet<TblTools> TblTools { get; set; }
        public virtual DbSet<TblTypesOfMeasurements> TblTypesOfMeasurements { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=CateringDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblCategories>(entity =>
            {
                entity.HasKey(e => e.CategoryId)
                    .HasName("PK__tbl_Cate__DD7994A7AB926DDC");

                entity.ToTable("tbl_Categories");

                entity.Property(e => e.CategoryId).HasColumnName("categoryId");

                entity.Property(e => e.CategoryName)
                    .HasColumnName("categoryName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PreOrderTime)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblDetailsEvent>(entity =>
            {
                entity.HasKey(e => e.EventId)
                    .HasName("PK__tmp_ms_x__2DC7BD093E5D1D7E");

                entity.ToTable("tbl_detailsEvent");

                entity.Property(e => e.EventId).HasColumnName("eventId");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Details)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ToolId).HasColumnName("toolId");

                entity.HasOne(d => d.Tool)
                    .WithMany(p => p.TblDetailsEvent)
                    .HasForeignKey(d => d.ToolId)
                    .HasConstraintName("FK__tbl_detai__toolI__571DF1D5");
            });

            modelBuilder.Entity<TblDoseType>(entity =>
            {
                entity.HasKey(e => e.DoseTypeId)
                    .HasName("PK__tbl_dose__3BE7F5C62B774B86");

                entity.ToTable("tbl_doseType");

                entity.Property(e => e.DoseTypeId).HasColumnName("doseTypeId");

                entity.Property(e => e.DoseName)
                    .HasColumnName("doseName")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblMenuTypes>(entity =>
            {
                entity.HasKey(e => e.MenuId)
                    .HasName("PK__tbl_menu__3B40717463709B7C");

                entity.ToTable("tbl_menuTypes");

                entity.Property(e => e.MenuId).HasColumnName("menuId");

                entity.Property(e => e.MenuName)
                    .HasColumnName("menuName")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblProducts>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("PK__tmp_ms_x__2D10D16A3CEC3551");

                entity.ToTable("tbl_Products");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.CategoryId).HasColumnName("categoryId");

                entity.Property(e => e.ProductName)
                    .HasColumnName("productName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.QuantityInStock).HasColumnName("quantityInStock");

                entity.Property(e => e.TypeOfMeasurementId).HasColumnName("typeOfMeasurementId");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.TblProducts)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_Produ__categ__49C3F6B7");

                entity.HasOne(d => d.TypeOfMeasurement)
                    .WithMany(p => p.TblProducts)
                    .HasForeignKey(d => d.TypeOfMeasurementId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_Produ__typeO__4AB81AF0");
            });

            modelBuilder.Entity<TblProductsToRecipe>(entity =>
            {
                entity.HasKey(e => e.ProductToRecipeId)
                    .HasName("PK__tmp_ms_x__D3E0E767D42255BD");

                entity.ToTable("tbl_ProductsToRecipe");

                entity.Property(e => e.ProductToRecipeId)
                    .HasColumnName("productToRecipeId")
                    .ValueGeneratedNever();

                entity.Property(e => e.AmountToRecipe).HasColumnName("amountToRecipe");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.RecipesId).HasColumnName("recipesId");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductsToRecipe)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_Produ__produ__4E88ABD4");

                entity.HasOne(d => d.Recipes)
                    .WithMany(p => p.TblProductsToRecipe)
                    .HasForeignKey(d => d.RecipesId)
                    .HasConstraintName("FK__tbl_Produ__recip__4D94879B");
            });

            modelBuilder.Entity<TblRecipes>(entity =>
            {
                entity.HasKey(e => e.RecipesId)
                    .HasName("PK__tbl_reci__D30C6B3D57FF58AA");

                entity.ToTable("tbl_recipes");

                entity.Property(e => e.RecipesId).HasColumnName("recipesId");

                entity.Property(e => e.DoseTypeId).HasColumnName("doseTypeId");

                entity.Property(e => e.MenuId).HasColumnName("menuId");

                entity.HasOne(d => d.DoseType)
                    .WithMany(p => p.TblRecipes)
                    .HasForeignKey(d => d.DoseTypeId)
                    .HasConstraintName("FK__tbl_recip__doseT__3B75D760");

                entity.HasOne(d => d.Menu)
                    .WithMany(p => p.TblRecipes)
                    .HasForeignKey(d => d.MenuId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_recip__menuI__3A81B327");
            });

            modelBuilder.Entity<TblRecipesToOrder>(entity =>
            {
                entity.HasKey(e => e.RecipesToOrderId)
                    .HasName("PK__tbl_reci__7E19F43E14D9923D");

                entity.ToTable("tbl_recipesToOrder");

                entity.Property(e => e.RecipesToOrderId).HasColumnName("recipesToOrderId");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.EventId).HasColumnName("eventId");

                entity.Property(e => e.RecipesId).HasColumnName("recipesId");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.TblRecipesToOrder)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK__tbl_recip__event__5441852A");

                entity.HasOne(d => d.Recipes)
                    .WithMany(p => p.TblRecipesToOrder)
                    .HasForeignKey(d => d.RecipesId)
                    .HasConstraintName("FK__tbl_recip__recip__3D5E1FD2");
            });

            modelBuilder.Entity<TblTools>(entity =>
            {
                entity.HasKey(e => e.ToolId)
                    .HasName("PK__tmp_ms_x__CC0CEB91A459161F");

                entity.ToTable("tbl_tools");

                entity.Property(e => e.ToolName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTypesOfMeasurements>(entity =>
            {
                entity.HasKey(e => e.TypeOfMeasurementId)
                    .HasName("PK__tbl_Type__A9B48DEDE35C0AFB");

                entity.ToTable("tbl_TypesOfMeasurements");

                entity.Property(e => e.TypeOfMeasurementId).HasColumnName("typeOfMeasurementId");

                entity.Property(e => e.TypeOfMeasurement)
                    .HasColumnName("typeOfMeasurement")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
