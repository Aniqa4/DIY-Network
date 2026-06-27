import Title from "../../../../Components/Title";
import CategoryPage from "./CategoryPage";
import ActiveRoute from "../../../../Components/ActiveRoute";

const CATEGORIES = [
  { to: "/",            label: "All"          },
  { to: "/cooking",     label: "Cooking"      },
  { to: "/painting",    label: "Painting"     },
  { to: "/gardening",   label: "Gardening"    },
  { to: "/sewing",      label: "Sewing"       },
  { to: "/crafting",    label: "Crafting"     },
  { to: "/woodworking", label: "Woodworking"  },
  { to: "/knitting",    label: "Knitting"     },
];

function Categories() {
  return (
    <section id="explore" className="py-14">
      <Title title="Explore More" />

      <nav className="flex flex-wrap gap-2.5 pb-8" aria-label="Filter by category">
        {CATEGORIES.map(({ to, label }) => (
          <ActiveRoute key={to} to={to}>
            {label}
          </ActiveRoute>
        ))}
      </nav>

      <CategoryPage />
    </section>
  );
}

export default Categories;
