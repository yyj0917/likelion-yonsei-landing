import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import ProjectGrid from "@/components/projects/project-grid";

export const dynamic = "force-static";

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-likelion-orange selection:text-white">
      <Navbar />
      <div className="pt-12">
        <ProjectGrid />
      </div>
      <Footer />
    </main>
  );
}
