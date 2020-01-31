using Microsoft.EntityFrameworkCore.Migrations;

namespace MainForum.Migrations
{
    public partial class erqqe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Messages",
                table: "Messages");

            migrationBuilder.AddColumn<string>(
                name: "Messages",
                table: "Messages",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Messages",
                table: "Messages");

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Messages",
                maxLength: 255,
                nullable: true);
        }
    }
}
