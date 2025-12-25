// src/app/components/DropdownMenu.js
import Link from "next/link";
import { categories } from "../data/categories";

export default function DropdownMenu({ section, title }) {
  return (
    <div className="dropdown">
      <button className="dropbtn">{title} ▼</button>
      <div className="dropdown-content">
        {categories.map((category) => (
          <div key={category.value} className="dropdown-submenu">
            <Link href={`/${section}/${category.value}`} className="submenu-title">
              {category.title}
            </Link>
            {category.subcategories.length > 0 && (
              <div className="submenu-content">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.value}
                    href={`/${section}/${category.value}/${sub.value}`}
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
