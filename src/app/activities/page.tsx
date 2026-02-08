import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import ActivityGrid from "@/components/activities/activity-grid";

export const dynamic = "force-static";

export default function ActivitiesPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-likelion-orange selection:text-white">
      <Navbar />
      <div className="pt-12">
        <ActivityGrid />
      </div>
      <Footer />
    </main>
  );
}

