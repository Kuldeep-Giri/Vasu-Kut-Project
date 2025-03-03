using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VasuKut.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOtpVerificationTable1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVerified",
                table: "OtpVerifications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVerified",
                table: "OtpVerifications");
        }
    }
}
