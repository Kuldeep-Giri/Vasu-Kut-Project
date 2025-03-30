using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VasuKut.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedBannerTableUpdateSellerId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sellerId",
                table: "CompanyProfiles",
                newName: "SellerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SellerId",
                table: "CompanyProfiles",
                newName: "sellerId");
        }
    }
}
