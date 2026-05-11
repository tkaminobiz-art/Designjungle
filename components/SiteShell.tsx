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

export default function SiteShell() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const delay = window.sessionStorage.getItem("dj-loaded") ? 250 : 1800;
    window.sessionStorage.setItem("dj-loaded", "true");
    const timer = window.setTimeout(() => setIsLoaded(true), delay);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    document.querySelectorAll(".reveal, .mask").forEach((element) => {
      revealObserver.observe(element);
    });

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      <div className={`loader ${isLoaded ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loader__mark">
          <img src="/images/design-jungle-logo-mark.png" alt="" />
        </div>
      </div>

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

      <main id="top">
        <section className="hero" aria-label="ファーストビュー">
          <video
            className="hero__video"
            src="/videos/hero-cinematic.mp4"
            poster="/videos/hero-cinematic-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="hero__motion" aria-hidden="true">
            <span className="line line--one" />
            <span className="line line--two" />
            <span className="line line--three" />
            <span className="pulse pulse--lime" />
            <span className="pulse pulse--red" />
            <span className="pulse pulse--blue" />
          </div>
          <div className="hero__noise" aria-hidden="true" />
          <div className="hero__content">
            <p className="hero__eyebrow">NARA / BRANDING / SNS / CREATIVE</p>
            <h1>
              <span>DESIGN</span>
              <span>THE</span>
              <span>STRUCTURE.</span>
            </h1>
            <p className="hero__lead">奈良から、企業の認知と地域の動きを設計する。</p>
          </div>
          <a className="scroll-cue" href="#message">
            <span />
            Scroll
          </a>
        </section>

        <section className="message" id="message">
          <div className="signal-field" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="marquee marquee--top" aria-hidden="true">
            OPENING UP LOCAL VALUE
          </div>
          <div className="marquee marquee--bottom" aria-hidden="true">
            OPENING UP LOCAL VALUE
          </div>
          <div className="inner message__inner">
            <div className="section-head section-head--light">
              <p className="section-head__main reveal">MESSAGE</p>
              <h2 className="section-head__sub reveal">メッセージ</h2>
            </div>
            <div className="message__body">
              <div className="highlight-copy reveal">
                <p>デザインは、見た目だけではない。</p>
                <p>事業が動く構造をつくる。</p>
              </div>
              <p className="message__text reveal">
                デザインジャングルは、広告、SNS、ブランディング、Web制作を通じて、企業の認知と売上の入口を設計する会社です。
                ひとつの業種や手法に閉じるのではなく、多様な事業とクリエイティブを掛け合わせ、奈良から全国へ価値が届く流れをつくります。
              </p>
              <p className="message__text reveal">
                地域の事業者、若い世代、これから挑戦する人たちが、デジタルの力を使って自分たちの可能性を広げられるように。
                私たちは、宣伝するだけで終わらず、事業の見え方、伝わり方、広がり方までを一緒に設計します。
              </p>
            </div>
          </div>
        </section>

        <section className="service" id="service">
          <div className="inner">
            <div className="section-head section-head--center">
              <p className="section-head__main reveal">OUR SERVICE</p>
              <h2 className="section-head__sub reveal">事業内容</h2>
            </div>

            <article className="service-row">
              <div className="service-row__visual service-video reveal" aria-label="広告代理事業のイメージ動画">
                <video
                  src="/videos/service-advertising.mp4"
                  poster="/videos/service-advertising-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
                <p className="service-video__label">
                  AD
                  <br />
                  FLOW
                </p>
              </div>
              <div className="service-row__text">
                <p className="service-row__label reveal">広告代理事業</p>
                <h3 className="band-title reveal">Advertising</h3>
                <p className="reveal">
                  企業や商品の認知を広げるために、広告の企画、制作、運用、販売導線づくりまでを支援します。
                  伝えたいことを整理し、SNSやWeb上で届く形へ変換します。
                </p>
              </div>
            </article>

            <article className="service-row service-row--reverse">
              <div className="service-row__visual service-video reveal" aria-label="SNS運用・集客支援のイメージ動画">
                <video
                  src="/videos/service-sns.mp4"
                  poster="/videos/service-sns-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
                <p className="service-video__label">
                  SNS
                  <br />
                  SIGNAL
                </p>
              </div>
              <div className="service-row__text">
                <p className="service-row__label reveal">SNS運用・集客支援</p>
                <h3 className="band-title reveal">SNS Marketing</h3>
                <p className="reveal">
                  SNSアカウントの運用、インフルエンサー施策、ライブ配信支援など、デジタル上の接点づくりを支援します。
                  地域の発信力を束ね、ひとつの投稿を大きな動きに変えていきます。
                </p>
              </div>
            </article>

            <article className="service-row">
              <div className="service-row__visual service-video reveal" aria-label="デザイン・ブランディングのイメージ動画">
                <video
                  src="/videos/service-brand.mp4"
                  poster="/videos/service-brand-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
                <p className="service-video__label">
                  BRAND
                  <br />
                  SYSTEM
                </p>
              </div>
              <div className="service-row__text">
                <p className="service-row__label reveal">デザイン・ブランディング</p>
                <h3 className="band-title reveal">Brand Design</h3>
                <p className="reveal">
                  ロゴ、VI、Webサイト、各種クリエイティブを通じて、事業の印象を整えます。
                  見た目を作るだけでなく、誰に何をどう伝えるかまで含めて設計します。
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="origin" id="origin">
          <div className="inner origin__grid">
            <div className="section-head">
              <p className="section-head__main reveal">ORIGIN</p>
              <h2 className="section-head__sub reveal">社名の由来</h2>
            </div>
            <div className="origin__text">
              <p className="reveal">
                「デザイン」は、ロゴやWebだけを指す言葉ではありません。事業モデルをつくること、商品の見せ方を整えること、地域の動きを組み立てること。そのすべてを、私たちはデザインとして捉えています。
              </p>
              <p className="reveal">
                「ジャングル」は、多様なものが混ざり合い、それぞれの個性を発揮しながら、ひとつの生態系をつくる場所です。事業と人が交差し、新しい価値が育っていく場所でありたいという想いを、社名に込めています。
              </p>
            </div>
          </div>
        </section>

        <section className="group" id="group">
          <div className="inner group__inner">
            <div>
              <div className="section-head section-head--light">
                <p className="section-head__main reveal">GROUP</p>
                <h2 className="section-head__sub reveal">グループ事業</h2>
              </div>
              <p className="group__lead reveal">
                デザインジャングル株式会社を中心に、地域コミュニティ、SNS、通販、ブランディング支援を段階的に展開します。
              </p>
            </div>
            <div className="group-card reveal">
              <p className="group-card__eyebrow">COMMUNITY PROJECT</p>
              <h3>株式会社奈良ランド</h3>
              <p>
                奈良県を中心としたオンラインコミュニティの企画・運営を通じて、事業者、インフルエンサー、地域の挑戦をつなぐプロジェクトです。
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="footer" id="contact">
        <div className="footer__left">
          <div className="footer__logo reveal">
            <img src="/images/design-jungle-logo-mark.png" alt="DESIGN JUNGLE" />
          </div>
          <p className="footer__address reveal">
            〒630-8244
            <br />
            奈良県奈良市三条町475番地 松田ビル2F（YAMATOBASE）
          </p>
          <p className="footer__copy reveal">Copyright &copy; デザインジャングル株式会社 All Rights Reserved.</p>
        </div>
        <div className="footer__right">
          <p className="footer__contact reveal">
            Feel free to
            <br />
            contact us
          </p>
          <a className="primary-button reveal" href="mailto:info@example.com">
            CONTACT
          </a>
        </div>
      </footer>
    </>
  );
}
