"use client";

import { useEffect, useState } from "react";

const navItems = [
  ["TOP", "/#top"],
  ["MESSAGE", "/#message"],
  ["SERVICE", "/#service"],
  ["GROUP", "/#group"],
  ["COMPANY", "/company"],
  ["CONTACT", "/#contact"],
];

const companyRows = [
  ["会社名", "デザインジャングル株式会社"],
  ["所在地", "奈良県奈良市三条町475番地 松田ビル2F（YAMATOBASE）"],
  ["設立", "2026年4月17日"],
  ["代表者", "松田 慎平"],
  ["事業内容", "広告代理事業、SNS運用代行、コミュニティ運営、通販事業、ブランディング支援"],
  ["グループ会社", "株式会社奈良ランド"],
];

export default function CompanyShell() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  return (
    <>
      <div className="page-sweep" aria-hidden="true" />

      <header className="site-header" aria-label="サイトヘッダー">
        <button
          className="menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="site-menu" id="site-menu" aria-hidden={!isMenuOpen}>
          <nav className="site-menu__inner" aria-label="グローバルナビゲーション">
            <div className="site-menu__brand" aria-hidden="true">
              <img src="/images/design-jungle-logo-mark.png" alt="" />
            </div>
            <ul>
              {navItems.map(([label, href]) => (
                <li key={label}>
                  <a href={href} onClick={() => setIsMenuOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="company-page">
        <section className="company-hero" aria-label="会社概要">
          <div className="company-hero__noise" aria-hidden="true" />
          <div className="company-hero__line company-hero__line--one" aria-hidden="true" />
          <div className="company-hero__line company-hero__line--two" aria-hidden="true" />
          <div className="inner company-hero__inner">
            <p className="company-hero__eyebrow">DESIGN JUNGLE INC.</p>
            <h1>
              <span>COMPANY</span>
              <span>PROFILE</span>
            </h1>
            <p className="company-hero__lead">奈良から、企業の認知と地域の動きを設計する。</p>
          </div>
        </section>

        <section className="company-profile">
          <div className="inner company-profile__grid">
            <div className="company-profile__intro">
              <p className="company-profile__number">2026</p>
              <h2>事業が動く構造を、地域からつくる。</h2>
              <p>
                デザインジャングル株式会社は、広告、SNS、ブランディング、Web制作を横断し、
                企業の見え方と広がり方を設計する会社です。
              </p>
            </div>

            <div className="company-profile__table-wrap">
              <table className="company-table company-table--page">
                <tbody>
                  {companyRows.map(([heading, value]) => (
                    <tr key={heading}>
                      <th>{heading}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer__left">
          <div className="footer__logo">
            <img src="/images/design-jungle-logo-mark.png" alt="DESIGN JUNGLE" />
          </div>
          <p className="footer__address">
            〒630-8244
            <br />
            奈良県奈良市三条町475番地 松田ビル2F（YAMATOBASE）
          </p>
          <p className="footer__copy">Copyright &copy; デザインジャングル株式会社 All Rights Reserved.</p>
        </div>
        <div className="footer__right">
          <p className="footer__contact">
            Feel free to
            <br />
            contact us
          </p>
          <a className="primary-button" href="mailto:info@example.com">
            CONTACT
          </a>
        </div>
      </footer>
    </>
  );
}
