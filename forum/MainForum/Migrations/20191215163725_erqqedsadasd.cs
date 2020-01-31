using Microsoft.EntityFrameworkCore.Migrations;

namespace MainForum.Migrations
{
    public partial class erqqedsadasd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Messages",
                table: "Messages",
                newName: "Comment");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Messages",
                newName: "Messages");
        }
    }
}
