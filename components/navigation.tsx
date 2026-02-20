"use client";

import Link from "next/link";

export function Navigation() {
  return (
    <header>
      <div className="header-inner">
        <Link href="/" className="site-name">
          William Lugoloobi
        </Link>
        <nav>
          <ul className="header-nav">
            <li>
              <a href="#research">Research</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a
                href="/William_Gitta_Lugoloobi_CV.pdf"
                className="nav-cv"
                target="_blank"
              >
                CV ↗
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
