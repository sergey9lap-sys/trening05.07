"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";

type ProgramItem = {
  title: string;
  text: string;
  tone: "mint" | "lavender" | "paper" | "warm";
};

const results = [
  [47, "конверсии в заявку на бесплатнике"],
  [31, "из заявки в оплату"],
  [804, "регистраций в закрытом запуске без вебинара"],
];

const classicSteps = ["Внимание", "Интерес", "Желание", "Действие"];
const gameSteps = ["Вызов", "Исследование", "Достижение", "Награда"];

const program: ProgramItem[] = [
  {
    title: "Как устроена игровая воронка",
    text: "И почему она обходит рациональное сопротивление клиента.",
    tone: "mint",
  },
  {
    title: "4 этапа воронки",
    text: "Привлечение, вовлечение, трансформация, действие. Что на каждом делать.",
    tone: "lavender",
  },
  {
    title: "Квест-формат эфиров",
    text: "Как превратить любой эфир в квест: задания в чате, секретные комнаты, бонусы за активность.",
    tone: "paper",
  },
  {
    title: "Игровой прогрев",
    text: "Как выстроить прогрев как приключение, чтобы аудитория ждала продолжения.",
    tone: "warm",
  },
  {
    title: "Типы игроков по Бартлу",
    text: "Кто ваша аудитория и как под каждого выстроить механику.",
    tone: "lavender",
  },
  {
    title: "Рабочие механики",
    text: "Прогрессия, неожиданная награда, социальное доказательство, эксклюзивность.",
    tone: "warm",
  },
  {
    title: "Как не сломать запуск",
    text: "С чего начать, как тестировать новые воронки и что измерять.",
    tone: "mint",
  },
];

const tariffs = [
  {
    title: "Онлайн",
    price: "2 900 ₽",
    items: [
      "05 июля 10:00–17:00 мск полноценное участие онлайн в Zoom",
      "Доступ к записи тренинга 30 дней",
      "Подойдет, если хотите разобраться в подходе и внедрить первые элементы самостоятельно",
    ],
    cta: "Забронировать место",
  },
  {
    title: "Онлайн или офлайн + личная сессия",
    price: "19 900 ₽",
    items: [
      "05 июля 10:00–17:00 мск полноценное участие офлайн в Москве или онлайн в Zoom",
      "Индивидуальная сессия с Александрой по внедрению геймификации в ваши воронки",
      "Доступ к записи тренинга 30 дней",
      "Подойдет, если хотите разобрать свою воронку с экспертом и получить понятный план внедрения",
    ],
    cta: "Забронировать место",
    featured: true,
  },
  {
    title: "Онлайн или офлайн + разработка игры под ключ",
    price: "от 150 000 ₽",
    items: [
      "05 июля 10:00–17:00 мск полноценное участие офлайн в Москве или онлайн в Zoom",
      "Доступ к записи тренинга 90 дней",
      "Анализ продукта и текущей воронки",
      "Разработка игровой механики под запуск",
      "Сценарий вовлечения аудитории",
      "Логика заданий, наград и переходов",
      "Подготовка структуры игровой воронки",
      "Подойдет, если хотите не просто обучиться, а получить готовую механику под продукт",
    ],
    cta: "Оставить заявку",
  },
];

const careLinks = [
  ["Телеграм", "https://agkedu.getcourse.ru/tg_subscribe"],
  ["Макс", "https://agkedu.getcourse.ru/max_subscribe"],
  ["ВКонтакте", "https://agkedu.getcourse.ru/vk_subscribe"],
];

const COOKIE_CONSENT_KEY = "agk-cookie-consent";
const POLICY_URL = "https://agkedu.ru/personaldata";

function Icon({ name }: { name: "flag" | "search" | "star" | "gift" | "chart" | "users" | "shield" | "crown" }) {
  const paths = {
    flag: <path d="M5 20V5m0 0c3-2 5 2 9 0v8c-4 2-6-2-9 0" />,
    search: <path d="M10.5 17a6.5 6.5 0 1 1 4.6-1.9L20 20" />,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.1L12 17.2 6.4 20.1 7.5 14 3 9.6l6.2-.9L12 3Z" />,
    gift: <path d="M4 10h16v10H4Zm0 0V7h16v3m-8 0v10m-4-10C5 8 6 4 9 6c2 1 3 4 3 4m4-4c3-2 4 2 0 4h-4c0 0 1-3 4-4Z" />,
    chart: <path d="M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-3" />,
    users: <path d="M16 19c0-2-2-4-4-4s-4 2-4 4m8-9a4 4 0 1 1-8 0m10 8c0-1.6-1-3-2.5-3.6M18 7a3 3 0 0 1 0 6" />,
    shield: <path d="M12 21s7-3 7-10V5l-7-2-7 2v6c0 7 7 10 7 10Zm-3-10 2 2 4-4" />,
    crown: <path d="m4 8 4 4 4-7 4 7 4-4-2 10H6L4 8Z" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;
    let frame = 0;
    let splits: SplitType[] = [];

    if (!prefersReduced) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set("[data-reveal], [data-step], [data-visual], .word", {
          clearProps: "all",
        });
        gsap.set(".typing-bubble", { display: "none" });
        gsap.set(".care-message", { opacity: 1, y: 0, scale: 1 });
        gsap.set(".care-phone", { "--phone-glow": 0.24 });
        return;
      }

      const splitTargets = gsap.utils.toArray<HTMLElement>("[data-split]");
      splits = splitTargets.map((target) => new SplitType(target, { types: "words" }));

      gsap.from(".hero-title .word", {
        yPercent: 110,
        opacity: 0,
        rotateX: 18,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.045,
        delay: 0.15,
      });

      gsap.from("[data-hero-soft]", {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.55,
      });

      gsap.from("[data-hero-result]", {
        y: 22,
        opacity: 0,
        duration: 0.48,
        ease: "power2.out",
        stagger: 0.11,
        scrollTrigger: { trigger: ".result-grid", start: "top 86%", once: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((item) => {
        const target = Number(item.dataset.count || "0");
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: target > 100 ? 1.4 : 1.15,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
          onUpdate: () => {
            item.textContent = `+${Math.round(counter.value)}%`;
          },
        });
      });

      gsap.from("[data-visual]", {
        scale: 0.96,
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.95,
      });

      gsap.to("[data-float]", {
        y: -6,
        rotate: 1,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      const reveal = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveal.forEach((item) => {
        gsap.from(item, {
          y: 30,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 82%" },
        });
      });

      const working = gsap.timeline({
        scrollTrigger: { trigger: ".funnels-board", start: "top 72%" },
      });
      working
        .from(".funnel-card.is-classic", { x: -28, opacity: 0, duration: 0.55, ease: "power2.out" })
        .from(".transform-arrow", { opacity: 0, duration: 0.2 }, "-=0.05")
        .fromTo(".transform-arrow path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.65, ease: "power2.inOut" }, "-=0.05")
        .from(".funnel-card.is-game", { x: 28, opacity: 0, duration: 0.55, ease: "power2.out" }, "-=0.1")
        .from(".funnel-card li", { backgroundColor: "rgba(0, 191, 166, 0.16)", x: 10, duration: 0.28, stagger: 0.06 }, "-=0.2");

      const programTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".program-board", start: "top 72%", once: true },
      });
      programTimeline
        .from(".program-board", { y: 40, opacity: 0, duration: 0.55, ease: "power2.out" })
        .from(".program-card-1", { y: 24, opacity: 0, scale: 0.96, rotate: -3, duration: 0.4, ease: "power2.out" }, "-=0.15");

      for (let index = 1; index <= 6; index += 1) {
        programTimeline
          .fromTo(`.program-line-${index}`, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.38, ease: "power2.inOut" }, "-=0.08")
          .from(`.program-card-${index + 1}`, {
            y: 24,
            opacity: 0,
            scale: 0.96,
            rotate: index % 2 ? 2 : -2,
            duration: 0.38,
            ease: "power2.out",
          }, "-=0.08");
      }

      programTimeline.to(".program-card-7", {
        boxShadow: "0 28px 70px rgba(0, 191, 166, 0.22)",
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.from(".program-card .mini-clip, .program-card .tape", {
        opacity: 0,
        y: -8,
        scale: 0.9,
        duration: 0.28,
        stagger: 0.035,
        ease: "power2.out",
        scrollTrigger: { trigger: ".program-board", start: "top 70%", once: true },
      });

      gsap.from(".tariff-card", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".tariffs-grid", start: "top 80%" },
      });

      gsap.from(".author-photo-wrap", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".author", start: "top 78%" },
      });

      const careTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".care", start: "top 72%", once: true },
      });

      careTimeline
        .from(".care .eyebrow, .care h2, .care-copy p", {
          y: 30,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
        })
        .from(".care-actions a", {
          y: 18,
          opacity: 0,
          scale: 0.96,
          duration: 0.42,
          ease: "power2.out",
          stagger: 0.14,
        }, "-=0.08")
        .from(".care-phone", {
          x: 40,
          opacity: 0,
          scale: 0.96,
          duration: 0.68,
          ease: "power3.out",
        }, "+=0.04")
        .from(".phone-icon", {
          y: 8,
          opacity: 0,
          scale: 0.9,
          duration: 0.32,
          ease: "power2.out",
          stagger: 0.08,
        }, "-=0.22")
        .to(".care-phone", {
          "--phone-glow": 1,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.18")
        .to(".care-phone", {
          "--phone-glow": 0.24,
          duration: 0.4,
          ease: "power2.out",
        })
        .from(".typing-bubble", {
          y: 12,
          opacity: 0,
          scale: 0.96,
          duration: 0.28,
          ease: "power2.out",
        }, "-=0.12")
        .to(".typing-dot", {
          y: -3,
          opacity: 1,
          duration: 0.22,
          ease: "sine.inOut",
          stagger: 0.12,
          repeat: 2,
          yoyo: true,
        })
        .to(".typing-bubble", {
          y: -4,
          opacity: 0,
          duration: 0.18,
          ease: "power2.out",
        })
        .from(".care-message", {
          y: 12,
          opacity: 0,
          scale: 0.96,
          duration: 0.38,
          ease: "power2.out",
          stagger: 0.18,
        }, "-=0.02")
        .to(".care-phone", {
          scale: 1.015,
          duration: 0.16,
          ease: "power2.out",
        })
        .to(".care-phone", {
          scale: 1,
          duration: 0.28,
          ease: "power2.out",
        });

    }, scope);

    return () => {
      ctx.revert();
      splits.forEach((split) => split.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis?.destroy();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main ref={scope} className="site-shell">
      <section className="hero section-pad">
        <div className="hero-copy">
          <span className="eyebrow" data-hero-soft>
            Однодневный практический тренинг
          </span>
          <h1 className="hero-title" data-split>
            Игровые воронки:
            <br />
            геймификация и&nbsp;геймдизайн
            <br />
            в&nbsp;запуске
          </h1>
          <p className="hero-lead" data-hero-soft>
            Научитесь превращать запуски в&nbsp;увлекательные игровые системы,
            из&nbsp;которых аудитория не&nbsp;хочет выходить.
          </p>
          <a className="cta-button" href="#tariffs" data-hero-soft>
            Забронировать место
            <span aria-hidden="true">→</span>
          </a>
          <div className="result-grid" aria-label="Результаты из практики тренера">
            {results.map(([value, label]) => (
              <article className="result-slip" data-hero-result key={value}>
                <strong data-count={value}>+0%</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
          <p className="result-note" data-hero-soft>
            Результаты из практики тренера, май–июнь 2026
          </p>
        </div>

        <motion.div
          className="hero-visual"
          data-visual
          initial={false}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.25 }}
          aria-label="Александра проектирует стратегию запуска за рабочим столом"
        >
          <div className="hero-grid-paper" aria-hidden="true" />
          <div className="hero-photo-pad" aria-hidden="true" />
          <div className="hero-photo-shell">
            <Image
              src="/hero-workspace.jpg"
              width={1280}
              height={853}
              sizes="(max-width: 980px) 94vw, 50vw"
              alt="Александра Горева-Куртышева за рабочим столом с ноутбуком, блокнотом, планшетом и книгами"
              priority
            />
          </div>
          <span className="hero-photo-tape" data-float aria-hidden="true" />
        </motion.div>
      </section>

      <section className="why section-pad" aria-labelledby="why-title">
        <h2 id="why-title" data-reveal>
          Почему игровые воронки работают
        </h2>
        <div className="funnels-board">
          <span className="bridge-tape" aria-hidden="true">переводим в игру</span>
          <FunnelCard
            title="Классическая воронка"
            steps={classicSteps}
            note="Клиент пассивно потребляет и в любой момент может выпасть."
            variant="classic"
          />
          <div className="transform-arrow" aria-hidden="true">
            <svg viewBox="0 0 160 70">
              <path pathLength="1" d="M12 36 C50 22 94 22 140 36" />
              <path pathLength="1" d="M129 25 L142 36 L128 46" />
            </svg>
          </div>
          <FunnelCard
            title="Игровая воронка"
            steps={gameSteps}
            note="Клиент активно участвует, получает дофамин и сам принимает решение двигаться дальше."
            variant="game"
          />
        </div>
      </section>

      <section className="program section-pad" aria-labelledby="program-title">
        <div className="program-head" data-reveal>
          <h2 id="program-title">
            Что разберем на&nbsp;тренинге
          </h2>
          <p>7 точек, из которых собирается игровая воронка для запуска</p>
        </div>
        <div className="program-board">
          <svg className="program-lines program-lines-desktop" viewBox="0 0 1120 940" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="program-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <path d="M1 1 L8 5 L1 9" />
              </marker>
            </defs>
            <path className="program-line program-line-1" pathLength="1" d="M306 176 C372 176 390 220 432 238" />
            <path className="program-line program-line-2" pathLength="1" d="M608 226 C675 192 704 154 780 150" />
            <path className="program-line program-line-3" pathLength="1" d="M946 236 C990 280 982 326 928 360" />
            <path className="program-line program-line-4" pathLength="1" d="M884 498 C700 486 466 474 314 550" />
            <path className="program-line program-line-5" pathLength="1" d="M326 612 C408 646 470 648 548 628" />
            <path className="program-line program-line-6" pathLength="1" d="M780 646 C856 664 900 682 946 690" />
          </svg>
          <svg className="program-lines program-lines-mobile" viewBox="0 0 100 760" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="program-mobile-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <path d="M1 1 L8 5 L1 9" />
              </marker>
            </defs>
            <path className="program-line program-line-1" pathLength="1" d="M50 40 V145" />
            <path className="program-line program-line-2" pathLength="1" d="M50 160 V265" />
            <path className="program-line program-line-3" pathLength="1" d="M50 280 V385" />
            <path className="program-line program-line-4" pathLength="1" d="M50 400 V505" />
            <path className="program-line program-line-5" pathLength="1" d="M50 520 V625" />
            <path className="program-line program-line-6" pathLength="1" d="M50 640 V735" />
          </svg>
          <span className="board-cursor" aria-hidden="true" />
          <span className="board-chip board-chip-one" aria-hidden="true">механика</span>
          <span className="board-chip board-chip-two" aria-hidden="true">запуск</span>
          <span className="board-dot board-dot-one" aria-hidden="true" />
          <span className="board-dot board-dot-two" aria-hidden="true" />
          {program.map((item, index) => (
            <article className={`program-card program-card-${index + 1} attach-${["tape", "pin", "clip", "tag", "tape", "pin", "corner"][index]} tone-${item.tone}`} key={item.title}>
              <span className="mini-clip" />
              <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
              <Icon name={index % 3 === 0 ? "chart" : index % 3 === 1 ? "users" : "shield"} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="tape" />
            </article>
          ))}
        </div>
      </section>

      <section className="tariffs section-pad" id="tariffs" aria-labelledby="tariffs-title">
        <h2 id="tariffs-title" data-reveal>
          Тарифы
        </h2>
        <div className="tariffs-grid">
          {tariffs.map((tariff) => (
            <article className={`tariff-card ${tariff.featured ? "is-featured" : ""}`} key={tariff.title}>
              <span className="pin-ring" />
              <h3>{tariff.title}</h3>
              <strong>{tariff.price}</strong>
              <ul className="tariff-list">
                {tariff.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="cta-button" href="#care">
                {tariff.cta}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="author section-pad" aria-labelledby="author-title">
        <div className="author-photo-wrap">
          <span className="photo-tape" />
          <Image
            src="/_5ex8warsw54l8nuhb0qn_2.png"
            width={1024}
            height={1024}
            sizes="(max-width: 900px) 82vw, 420px"
            alt="Александра Горева-Куртышева"
            priority={false}
          />
        </div>
        <div className="author-copy" data-reveal>
          <span className="eyebrow">Кто ведет тренинг</span>
          <h2 id="author-title">Александра Горева-Куртышева</h2>
          <p className="author-lead">
            EdTech-предприниматель, основатель крупнейшей школы по методологии
            и методического агентства.
          </p>
          <ul>
            <li>С 2009 года в бизнес-обучении</li>
            <li>С 2020 года в онлайн-образовании</li>
            <li>Архитектор акселератора «Бизнес 360» от Сбера на 40 000 предпринимателей</li>
            <li>Консультант и тренер для Сбер, Роснефть, Норникель, Nestle, X5, ВкусВилл</li>
            <li>Вице-президент Ассоциации спикеров СНГ и лауреат 5 премий за вклад в образование</li>
          </ul>
          <blockquote>
            Я не просто рассказываю, а даю систему, которую можно внедрить
            в&nbsp;ваш запуск уже завтра.
          </blockquote>
        </div>
      </section>

      <section className="care section-pad" id="care" aria-labelledby="care-title">
        <div className="care-copy">
          <span className="eyebrow">Остались вопросы?</span>
          <h2 id="care-title">Напишите в&nbsp;службу заботы</h2>
          <p>
            Поможем выбрать тариф, подскажем по записи тренинга и ответим
            на&nbsp;вопросы по участию.
          </p>
          <div className="care-actions">
            {careLinks.map(([label, href]) => (
              <a href={href} key={label} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="care-phone" aria-label="Переписка со службой заботы">
          <span className="phone-icon phone-icon-one">?</span>
          <span className="phone-icon phone-icon-two">✓</span>
          <span className="phone-icon phone-icon-three">♡</span>
          <Image
            src="/botagkclub.jpg"
            width={624}
            height={1280}
            sizes="(max-width: 700px) 58vw, 300px"
            alt="Служба заботы в мессенджере"
          />
          <div className="care-chat-overlay" aria-hidden="true">
            <div className="typing-bubble">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
            <p className="care-message is-user">Здравствуйте! Подскажите, какой тариф выбрать?</p>
            <p className="care-message is-care">Если хотите личный разбор — лучше тариф с&nbsp;сессией.</p>
            <p className="care-message is-care">Записать вас на&nbsp;тренинг?</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>Игровые воронки</strong>
          <p>
            Однодневный практический тренинг по геймификации и геймдизайну
            в&nbsp;запусках.
          </p>
        </div>
        <div>
          <strong>Данные</strong>
          <p>
            Индивидуальный предприниматель
            <br />
            Горева-Куртышева Александра Александровна
            <br />
            ИНН: 246212538610
          </p>
        </div>
        <nav aria-label="Ссылки футера">
          <strong>Контакты</strong>
          <a href="tel:+79895421560">+7 (989) 542-15-60</a>
          <a href="https://agkedu.getcourse.ru/tg_subscribe" target="_blank" rel="noreferrer">
            Телеграм
          </a>
          <a href="https://agkedu.ru/personaldata" target="_blank" rel="noreferrer">
            Политика конфиденциальности
          </a>
          <a
            href="https://agkedu.getcourse.ru/oferta_igrovie_voronki"
            target="_blank"
            rel="noreferrer"
          >
            Договор-оферта
          </a>
        </nav>
        <div className="footer-copy">
          <p>© 2026. Все права защищены. Практика. Стратегия. Результат.</p>
          <a className="footer-dev-link" href="https://t.me/lp_sergey" target="_blank" rel="noreferrer">
            Разработка сайтов
          </a>
        </div>
      </footer>
      <CookieNotice />
    </main>
  );
}

function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted");
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="cookie-notice" role="dialog" aria-label="Уведомление об использовании cookies">
      <button className="cookie-notice-close" type="button" onClick={acceptCookies} aria-label="Закрыть уведомление">
        ×
      </button>
      <p>
        Продолжая использование сайта, я выражаю согласие на&nbsp;обработку моих
        персональных данных при помощи сервиса ЯндексМетрика, подтверждаю, что
        ознакомлен с&nbsp;
        <a href={POLICY_URL} target="_blank" rel="noreferrer">
          политикой в&nbsp;отношении обработки персональных данных
        </a>
        &nbsp;и уведомлен об&nbsp;использовании файлов cookies.
      </p>
      <button className="cookie-notice-accept" type="button" onClick={acceptCookies}>
        Соглашаюсь
      </button>
    </aside>
  );
}

function FunnelCard({
  title,
  steps,
  note,
  variant,
}: {
  title: string;
  steps: string[];
  note: string;
  variant: "classic" | "game";
}) {
  const icons = variant === "classic" ? ["search", "star", "gift", "chart"] : ["flag", "search", "star", "gift"];

  return (
    <article className={`funnel-card is-${variant}`}>
      <span className="top-tape">{title}</span>
      <ul>
        {steps.map((step, index) => (
          <li key={step}>
            <Icon name={icons[index] as "search"} />
            <span>{step}</span>
          </li>
        ))}
      </ul>
      <p>{note}</p>
    </article>
  );
}
