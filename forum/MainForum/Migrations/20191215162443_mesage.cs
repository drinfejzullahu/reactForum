using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MainForum.Migrations
{
    public partial class mesage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
               name: "Messages",
               columns: table => new
               {
                   Id = table.Column<long>(nullable: false)
                       .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                   Messages = table.Column<string>(nullable: true),
                   Votes = table.Column<int>(nullable: false),
                   UserId = table.Column<long>(nullable: false),
                   PostId = table.Column<long>(nullable: false)
               },
               constraints: table =>
               {
                   table.PrimaryKey("PK_Messages", x => x.Id);
                   table.ForeignKey(
                       name: "FK_Messages_Posts_PostId",
                       column: x => x.PostId,
                       principalTable: "Posts",
                       principalColumn: "Id",
                       onDelete: ReferentialAction.Cascade);
                   table.ForeignKey(
                       name: "FK_Messages_Users_UserId",
                       column: x => x.UserId,
                       principalTable: "Users",
                       principalColumn: "Id",
                       onDelete: ReferentialAction.NoAction);
               });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_PostId",
                table: "Messages",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_UserId",
                table: "Messages",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
