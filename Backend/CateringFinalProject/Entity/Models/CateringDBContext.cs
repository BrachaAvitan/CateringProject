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
        public virtual DbSet<TblManager> TblManager { get; set; }
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
                    .HasName("PK__tmp_ms_x__2DC7BD092E35B789");

                entity.ToTable("tbl_detailsEvent");

                entity.Property(e => e.EventId).HasColumnName("eventId");

                entity.Property(e => e.Details)
                    .HasColumnName("details")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.EndDate)
                    .HasColumnName("endDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsCompleted).HasColumnName("isCompleted");

                entity.Property(e => e.ManagerId).HasColumnName("managerId");

                entity.Property(e => e.MenuId).HasColumnName("menuId");

                entity.Property(e => e.NameOfEventOwner)
                    .IsRequired()
                    .HasColumnName("nameOfEventOwner")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumberOfDose).HasColumnName("numberOfDose");

                entity.Property(e => e.PhoneNumberOfEventOwner)
                    .IsRequired()
                    .HasColumnName("phoneNumberOfEventOwner")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate)
                    .HasColumnName("startDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.ToolsType)
                    .IsRequired()
                    .HasColumnName("toolsType")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Manager)
                    .WithMany(p => p.TblDetailsEvent)
                    .HasForeignKey(d => d.ManagerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_detai__manag__3D2915A8");

                entity.HasOne(d => d.Menu)
                    .WithMany(p => p.TblDetailsEvent)
                    .HasForeignKey(d => d.MenuId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_detai__menuI__37703C52");
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

            modelBuilder.Entity<TblManager>(entity =>
            {
                entity.HasKey(e => e.ManagerId)
                    .HasName("PK__tmp_ms_x__47E0141FCAF76BFD");

                entity.ToTable("tbl_manager");

                entity.Property(e => e.ManagerId).HasColumnName("managerId");

                entity.Property(e => e.Active).HasColumnName("active");

                entity.Property(e => e.Blocked).HasColumnName("blocked");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("fullName")
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50);

                entity.Property(e => e.PasswordSalt)
                    .HasColumnName("passwordSalt")
                    .HasMaxLength(50);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasColumnName("phoneNumber")
                    .HasMaxLength(10);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("userName")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<TblMenuTypes>(entity =>
            {
                entity.HasKey(e => e.MenuId)
                    .HasName("PK__tbl_menu__3B40717463709B7C");

                entity.ToTable("tbl_menuTypes");

                entity.Property(e => e.MenuId).HasColumnName("menuId");

                entity.Property(e => e.ManagerId).HasColumnName("managerId");

                entity.Property(e => e.MenuName)
                    .IsRequired()
                    .HasColumnName("menuName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Manager)
                    .WithMany(p => p.TblMenuTypes)
                    .HasForeignKey(d => d.ManagerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_menuT__manag__3C34F16F");
            });

            modelBuilder.Entity<TblProducts>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("PK__tmp_ms_x__2D10D16A3CEC3551");

                entity.ToTable("tbl_Products");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.CategoryId).HasColumnName("categoryId");

                entity.Property(e => e.ManagerId).HasColumnName("managerId");

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

                entity.HasOne(d => d.Manager)
                    .WithMany(p => p.TblProducts)
                    .HasForeignKey(d => d.ManagerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_Produ__manag__3E1D39E1");

                entity.HasOne(d => d.TypeOfMeasurement)
                    .WithMany(p => p.TblProducts)
                    .HasForeignKey(d => d.TypeOfMeasurementId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_Produ__typeO__4AB81AF0");
            });

            modelBuilder.Entity<TblProductsToRecipe>(entity =>
            {
                entity.HasKey(e => e.ProductToRecipeId)
                    .HasName("PK__tmp_ms_x__D3E0E7676875D52D");

                entity.ToTable("tbl_ProductsToRecipe");

                entity.Property(e => e.ProductToRecipeId).HasColumnName("productToRecipeId");

                entity.Property(e => e.AmountToRecipe).HasColumnName("amountToRecipe");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.RecipesId).HasColumnName("recipesId");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductsToRecipe)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_Produ__produ__1332DBDC");

                entity.HasOne(d => d.Recipes)
                    .WithMany(p => p.TblProductsToRecipe)
                    .HasForeignKey(d => d.RecipesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_Produ__recip__14270015");
            });

            modelBuilder.Entity<TblRecipes>(entity =>
            {
                entity.HasKey(e => e.RecipesId)
                    .HasName("PK__tmp_ms_x__D30C6B3DC3F418D5");

                entity.ToTable("tbl_recipes");

                entity.Property(e => e.RecipesId).HasColumnName("recipesId");

                entity.Property(e => e.DoseTypeId).HasColumnName("doseTypeId");

                entity.Property(e => e.Instructions).HasColumnName("instructions");

                entity.Property(e => e.ManagerId).HasColumnName("managerId");

                entity.Property(e => e.MenuId).HasColumnName("menuId");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.HasOne(d => d.DoseType)
                    .WithMany(p => p.TblRecipes)
                    .HasForeignKey(d => d.DoseTypeId)
                    .HasConstraintName("FK__tbl_recip__doseT__70DDC3D8");

                entity.HasOne(d => d.Manager)
                    .WithMany(p => p.TblRecipes)
                    .HasForeignKey(d => d.ManagerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_recip__manag__40058253");

                entity.HasOne(d => d.Menu)
                    .WithMany(p => p.TblRecipes)
                    .HasForeignKey(d => d.MenuId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_recip__menuI__6FE99F9F");
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
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_recip__event__3587F3E0");

                entity.HasOne(d => d.Recipes)
                    .WithMany(p => p.TblRecipesToOrder)
                    .HasForeignKey(d => d.RecipesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_recip__recip__1DB06A4F");
            });

            modelBuilder.Entity<TblTools>(entity =>
            {
                entity.HasKey(e => e.ToolId)
                    .HasName("PK__tmp_ms_x__CC0CEB91A459161F");

                entity.ToTable("tbl_tools");

                entity.Property(e => e.ManagerId).HasColumnName("managerId");

                entity.Property(e => e.ToolName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Manager)
                    .WithMany(p => p.TblTools)
                    .HasForeignKey(d => d.ManagerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_tools__manag__3F115E1A");
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
