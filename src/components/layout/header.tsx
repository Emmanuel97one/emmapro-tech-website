"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { primaryNavigation } from "@/config/navigation";
import { messages } from "@/content/messages";
import { getProductTranslation, getProducts } from "@/data/products/registry";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LanguageSelector } from "@/components/ui/language-selector";

const products = getProducts();

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {messages.navigation.skipToContent}
      </a>
      <Container className="site-header__inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {primaryNavigation.map((item) =>
            item.label === "products" ? (
              <details className="desktop-product-menu" key={item.href}>
                <summary
                  aria-current={
                    pathname.startsWith("/products") ? "page" : undefined
                  }
                >
                  {messages.navigation.products}
                </summary>
                <div className="desktop-product-menu__panel">
                  <Link href="/products">{messages.navigation.allProducts}</Link>
                  {products.map((product) => (
                    <Link
                      href={`/products/${product.slug}`}
                      key={product.id}
                      aria-current={
                        pathname === `/products/${product.slug}`
                          ? "page"
                          : undefined
                      }
                    >
                      {getProductTranslation(product).productName}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                    ? "page"
                    : undefined
                }
              >
                {messages.navigation[item.label]}
              </Link>
            ),
          )}
          <details className="desktop-product-menu">
            <summary>{messages.navigation.pricing}</summary>
            <div className="desktop-product-menu__panel">
              {products.map((product) => (
                <Link href={`/products/${product.slug}#pricing`} key={product.id}>
                  {getProductTranslation(product).productName}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="site-header__actions">
          <LanguageSelector />
          <Button href="/contact" className="header-cta">
            {messages.navigation.contact} <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={
              mobileMenuOpen
                ? messages.navigation.closeMenu
                : messages.navigation.openMenu
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          <Container className="mobile-nav__inner">
            {primaryNavigation.map((item) => (
              <div className="mobile-nav__group" key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href))
                      ? "page"
                      : undefined
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {messages.navigation[item.label]}
                </Link>
                {item.label === "products" && (
                  <div className="mobile-nav__products">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        aria-current={
                          pathname === `/products/${product.slug}`
                            ? "page"
                            : undefined
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {getProductTranslation(product).productName}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mobile-nav__group">
              <span className="mobile-nav__heading">{messages.navigation.pricing}</span>
              <div className="mobile-nav__products">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}#pricing`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {getProductTranslation(product).productName}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              className="mobile-nav__contact"
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              {messages.navigation.contact} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
