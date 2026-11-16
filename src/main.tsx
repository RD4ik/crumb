import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  X,
  ShoppingBag,
  Menu,
  Check,
  ChevronDown,
  Wheat,
  Clock3,
  Download,
} from "lucide-react";
import "./fonts.css";
import "./style.css";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  ingredients: string;
  allergens: string;
  tag?: string;
};
const products: Product[] = [
  {
    id: "country",
    name: "Тот самый деревенский",
    category: "Хлеб",
    description: "Хрустящая корочка. Воздушный мякиш. И ничего лишнего.",
    price: 320,
    weight: "600 г",
    image: "sourdough",
    ingredients: "Пшеничная мука, вода, ржаная закваска, морская соль.",
    allergens: "Глютен",
    tag: "Начните с него",
  },
  {
    id: "croissant",
    name: "Круассан, как надо",
    category: "Выпечка",
    description: "Сотни тонких слоёв и французское сливочное масло.",
    price: 190,
    weight: "90 г",
    image: "croissant",
    ingredients:
      "Пшеничная мука, сливочное масло, молоко, яйцо, сахар, дрожжи, соль.",
    allergens: "Глютен, молоко, яйцо",
  },
  {
    id: "rye",
    name: "Зерновой с характером",
    category: "Хлеб",
    description: "Семечки, злаки и мягкая кислинка живой закваски.",
    price: 360,
    weight: "500 г",
    image: "bread",
    ingredients:
      "Ржаная и пшеничная мука, вода, закваска, семена подсолнечника, кунжут, морская соль.",
    allergens: "Глютен, кунжут",
  },
  {
    id: "morning",
    name: "Маленькое утро",
    category: "Выпечка",
    description: "Слоёная булочка для кофе и пяти минут на себя.",
    price: 240,
    weight: "120 г",
    image: "pastry",
    ingredients:
      "Пшеничная мука, сливочное масло, молоко, сахар, яйцо, корица.",
    allergens: "Глютен, молоко, яйцо",
  },
  {
    id: "weekend",
    name: "Хлеб на весь стол",
    category: "Хлеб",
    description: "Большая пшеничная буханка. Для тех, кто любит делиться.",
    price: 480,
    weight: "900 г",
    image: "bakery",
    ingredients: "Пшеничная мука, вода, закваска, морская соль.",
    allergens: "Глютен",
  },
  {
    id: "breakfast",
    name: "Два круассана к утру",
    category: "Наборы",
    description: "Завтрак на двоих начинается с хорошей выпечки.",
    price: 360,
    weight: "2 × 90 г",
    image: "croissant",
    ingredients:
      "Пшеничная мука, сливочное масло, молоко, яйцо, сахар, дрожжи, соль.",
    allergens: "Глютен, молоко, яйцо",
  },
];
const rub = (n: number) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";
type Cart = Record<string, number>;
function readCart(): Cart {
  try {
    const c = JSON.parse(localStorage.getItem("crumb-basket") || "{}");
    return Object.fromEntries(
      Object.entries(c).filter(
        ([id, q]) =>
          products.some((p) => p.id === id) &&
          typeof q === "number" &&
          Number.isInteger(q) &&
          q > 0 &&
          q <= 20,
      ),
    ) as Cart;
  } catch {
    return {};
  }
}
function tomorrow(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}
function App() {
  const [filter, setFilter] = useState("Всё");
  const [cart, setCart] = useState<Cart>(readCart);
  const [detail, setDetail] = useState<Product | null>(null);
  const [basketOpen, setBasketOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [complete, setComplete] = useState(false);
  const [name, setName] = useState("");
  const [day, setDay] = useState("1");
  const [time, setTime] = useState("09:00–11:00");
  const [formError, setFormError] = useState("");
  const detailRef = useRef<HTMLDialogElement>(null),
    cartRef = useRef<HTMLDialogElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce((a, p) => a + p.price * (cart[p.id] || 0), 0);
  const visible = products.filter(
    (p) => filter === "Всё" || p.category === filter,
  );
  useEffect(() => {
    try {
      localStorage.setItem("crumb-basket", JSON.stringify(cart));
    } catch {
      /* The basket remains usable when browser storage is unavailable. */
    }
  }, [cart]);
  useEffect(() => {
    const el = detailRef.current;
    if (detail && !el?.open) el?.showModal();
    else if (!detail && el?.open) el.close();
  }, [detail]);
  useEffect(() => {
    const el = cartRef.current;
    if (basketOpen && !el?.open) el?.showModal();
    else if (!basketOpen && el?.open) el.close();
  }, [basketOpen]);
  useEffect(() => {
    document.body.style.overflow = basketOpen || detail ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [basketOpen, detail]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  function announce(message: string) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }
  function add(p: Product) {
    setCart((c) => ({ ...c, [p.id]: Math.min(20, (c[p.id] || 0) + 1) }));
    announce(p.name + " — в корзине");
  }
  function change(id: string, delta: number) {
    setCart((c) => {
      const next = { ...c };
      next[id] = Math.min(20, (next[id] || 0) + delta);
      if (next[id] <= 0) delete next[id];
      return next;
    });
    setComplete(false);
  }
  function openBasket() {
    setCheckout(false);
    setComplete(false);
    setFormError("");
    setBasketOpen(true);
  }
  function goToBread() {
    setBasketOpen(false);
    setMenuOpen(false);
    document.querySelector("#bread")?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  function download() {
    const text = [
      "Crumb — демонстрационный предзаказ",
      "Не отправлен в пекарню. Оплата не требуется.",
      `Имя: ${name.trim()}`,
      `Самовывоз: ${tomorrow(Number(day))}, ${time}`,
      ...products
        .filter((p) => cart[p.id])
        .map((p) => `${p.name} × ${cart[p.id]} — ${rub(p.price * cart[p.id])}`),
      `Итого: ${rub(total)}`,
    ].join("\n");
    const a = document.createElement("a");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    a.href = url;
    a.download = "crumb-order.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <a className="skip" href="#bread">
        Перейти к каталогу
      </a>
      <div className="announcement">
        <span>Хлеб и маленькие радости</span>
        <span>Каждое утро начинается с новой партии</span>
      </div>
      <header className="header">
        <a className="wordmark" href="#" aria-label="Crumb — на главную">
          crumb<span className="logo-dot">.</span>
        </a>
        <nav
          id="main-navigation"
          aria-label="Основная навигация"
          className={menuOpen ? "navigation is-open" : "navigation"}
        >
          <a href="#bread" onClick={() => setMenuOpen(false)}>
            Наша витрина
          </a>
          <a href="#story" onClick={() => setMenuOpen(false)}>
            Как мы печём
          </a>
          <a href="#questions" onClick={() => setMenuOpen(false)}>
            Вопросы
          </a>
        </nav>
        <div className="header-actions">
          <button className="cart-button" onClick={openBasket}>
            <ShoppingBag size={19} />
            <span>Корзина</span>
            <span className="cart-count">{count}</span>
          </button>
          <button
            className="menu-button icon-button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              Хлеб, ради <br />
              которого <br />
              встают рано.
            </h1>
            <p>
              Простые ингредиенты, живая закваска
              <br className="desktop-break" /> и время. Всё остальное — лишнее.
            </p>
            <a href="#bread" className="button primary">
              Выбрать свой хлеб <ArrowUpRight size={20} />
            </a>
            <div className="hero-footnote">
              <Wheat size={21} />
              <span>
                Хлеб на закваске.
                <br />
                Сделан руками. Съеден с удовольствием.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-photo"
              src="/images/hero.jpg"
              alt="Деревенский хлеб на закваске с золотистой хрустящей корочкой"
              fetchPriority="high"
            />
            <div className="ingredient-stamp">
              <span>В хорошем хлебе</span>
              <strong>
                Мука. Вода.
                <br />
                Соль. Время.
              </strong>
              <span>Ничего лишнего</span>
            </div>
            <div className="hero-product">
              <div>
                <button
                  className="text-button hero-product-name"
                  onClick={() => setDetail(products[0])}
                >
                  Тот самый деревенский <ArrowUpRight size={17} />
                </button>
              </div>
              <div className="quick-price">
                <span>{rub(320)}</span>
                <button
                  aria-label="Добавить деревенский хлеб в корзину"
                  className="add-button"
                  onClick={() => add(products[0])}
                >
                  <Plus size={22} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="bread-line" aria-label="Наш подход">
          <span>Медленное тесто.</span>
          <Wheat />
          <span>Хрустящая корочка.</span>
          <Wheat />
          <span>Никакой спешки.</span>
          <Wheat />
          <span>Просто хороший хлеб.</span>
        </div>
        <section
          className="catalog section"
          id="bread"
          aria-labelledby="catalog-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="catalog-title">Из печи — к вашему столу.</h2>
              <p>На завтрак. К ужину. Просто так.</p>
            </div>
            <div className="catalog-note">
              <Clock3 size={18} />
              <span>
                Предзаказ на завтра <br />
                Чтобы точно досталось вам
              </span>
            </div>
          </div>
          <div className="catalog-toolbar">
            <div className="filters" aria-label="Категории каталога">
              {["Всё", "Хлеб", "Выпечка", "Наборы"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={filter === f ? "filter active" : "filter"}
                >
                  {f}
                  {f === "Всё" && <span>{products.length}</span>}
                </button>
              ))}
            </div>
            <span className="result-count" aria-live="polite">
              {visible.length}{" "}
              {visible.length === 1
                ? "позиция"
                : visible.length < 5
                  ? "позиции"
                  : "позиций"}
            </span>
          </div>
          <div className="product-grid">
            {visible.map((p) => (
              <article className="product" key={p.id}>
                <button
                  className={"product-image image-" + p.image}
                  onClick={() => setDetail(p)}
                  aria-label={"Подробнее: " + p.name}
                >
                  <img
                    src={"/images/" + p.image + ".jpg"}
                    alt={p.name}
                    loading="lazy"
                  />
                  {p.tag && <span className="product-tag">{p.tag}</span>}
                  <span className="view-product">
                    <ArrowUpRight size={21} />
                  </span>
                </button>
                <div className="product-top">
                  <button
                    onClick={() => setDetail(p)}
                    className="text-button product-title"
                  >
                    {p.name}
                  </button>
                  <span className="weight">{p.weight}</span>
                </div>
                <p>{p.description}</p>
                <div className="product-bottom">
                  <span>{rub(p.price)}</span>
                  <button
                    className={cart[p.id] ? "add-to-cart added" : "add-to-cart"}
                    onClick={() => add(p)}
                    aria-label={"Добавить: " + p.name}
                  >
                    {cart[p.id] ? (
                      <>
                        <Check size={16} />
                        <span>В корзине · {cart[p.id]}</span>
                      </>
                    ) : (
                      <>
                        <span>В корзину</span>
                        <Plus size={17} />
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-image">
            <img
              src="/images/bakery.jpg"
              alt="Свежие буханки хлеба с надрезами на золотистой корочке"
              loading="lazy"
            />
            <div className="image-caption">Хорошему хлебу нужно время.</div>
          </div>
          <div className="story-copy">
            <h2 id="story-title">
              Мы не торопим <br />
              хлеб. И вас <br />
              не будем.
            </h2>
            <p>
              Замешать. Дать отдохнуть. Сложить руками. И снова подождать. У
              хлеба на закваске свой ритм — его не ускоришь.
            </p>
            <p>
              Нам нравится эта простая мысль: самые хорошие вещи не случаются на
              бегу. Будь то тесто, воскресный завтрак или разговор за столом.
            </p>
            <div className="story-rule">
              <span className="story-number">24</span>
              <span>
                часа от замеса
                <br />
                до первой хрустящей корочки
              </span>
            </div>
            <a href="#bread" className="story-link">
              Найти свой любимый <ArrowRight size={20} />
            </a>
          </div>
        </section>
        <section
          className="questions section"
          id="questions"
          aria-labelledby="questions-title"
        >
          <div>
            <h2 id="questions-title">
              К хлебу <br />
              есть вопросы?
            </h2>
            <p>
              Осталось только выбрать,
              <br />с чем его съесть.
            </p>
          </div>
          <div className="faq-list">
            {[
              [
                "Как работает предзаказ?",
                "Выберите хлеб, добавьте его в корзину и укажите время самовывоза на завтра или послезавтра. Сейчас это демонстрационный сайт: заказ можно собрать и скачать, но он не отправляется в пекарню.",
              ],
              [
                "Как хранить хлеб, чтобы он оставался вкусным?",
                "Заверните хлеб в льняное полотенце или положите в бумажный пакет. Для долгого хранения нарежьте и заморозьте порционно. Несколько минут в тостере вернут корочке хруст.",
              ],
              [
                "Что внутри? Есть ли аллергены?",
                "Состав и аллергены указаны в описании каждого товара — нажмите на название или фотографию. В хлебе есть глютен, в выпечке также могут быть молоко и яйца.",
              ],
              [
                "Можно ли заказать только один круассан?",
                "Конечно. У маленьких радостей не должно быть минимальной суммы. Добавьте в корзину то, что хочется именно вам.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={20} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing">
          <h2>
            Завтра будет
            <br />
            хороший хлеб.
          </h2>
          <a href="#bread" className="button light">
            Позаботиться о завтра <ArrowUpRight size={20} />
          </a>
          <span>А сегодня можно выбрать.</span>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <a href="#" className="wordmark">
            crumb.
          </a>
          <p>
            Хлеб и маленькие радости.
            <br />
            Каждому дню — своя корочка.
          </p>
          <a href="#bread">
            К витрине <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Crumb</span>
          <span>
            Авторская концепция пекарни. Товары и цены — для демонстрации.
          </span>
          <a href="#">Наверх ↑</a>
        </div>
      </footer>
      <div className={toast ? "toast show" : "toast"} role="status">
        <Check size={18} />
        {toast}
      </div>
      <dialog
        ref={detailRef}
        className="product-dialog"
        aria-label="Описание товара"
        onCancel={() => setDetail(null)}
        onClose={() => setDetail(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setDetail(null);
        }}
      >
        {detail && (
          <div className="detail-layout">
            <img src={"/images/" + detail.image + ".jpg"} alt={detail.name} />
            <div className="detail-copy">
              <button
                className="close-button icon-button"
                aria-label="Закрыть описание"
                onClick={() => setDetail(null)}
              >
                <X />
              </button>
              <span className="weight">
                {detail.category} · {detail.weight}
              </span>
              <h2>{detail.name}</h2>
              <p>{detail.description}</p>
              <h3>Состав</h3>
              <p>{detail.ingredients}</p>
              <h3>Аллергены</h3>
              <p>
                {detail.allergens}. Возможно наличие следов орехов и кунжута.
              </p>
              <button
                className="button primary"
                onClick={() => {
                  add(detail);
                  setDetail(null);
                }}
              >
                В корзину · {rub(detail.price)}
                <Plus size={20} />
              </button>
            </div>
          </div>
        )}
      </dialog>
      <dialog
        ref={cartRef}
        className="cart-dialog"
        aria-label="Корзина и предзаказ"
        onCancel={() => setBasketOpen(false)}
        onClose={() => setBasketOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setBasketOpen(false);
        }}
      >
        <div className="cart-shell">
          <div className="cart-heading">
            <h2>
              {complete
                ? "Всё собрано."
                : checkout
                  ? "К вашему утру."
                  : "Ваш хлеб."}
            </h2>
            <button
              className="icon-button"
              aria-label="Закрыть корзину"
              onClick={() => setBasketOpen(false)}
            >
              <X />
            </button>
          </div>
          {count === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={44} strokeWidth={1} />
              <h3>Здесь пока ни крошки.</h3>
              <p>
                Добавьте хлеб или что-нибудь
                <br />к утреннему кофе.
              </p>
              <button className="button primary" onClick={goToBread}>
                К витрине
                <ArrowRight size={18} />
              </button>
            </div>
          ) : complete ? (
            <div className="order-complete">
              <span className="success-mark">
                <Check size={32} />
              </span>
              <h3>
                Хорошее утро
                <br />
                уже в планах.
              </h3>
              <p>
                {name}, ваш список на {tomorrow(Number(day))}, {time} готов.
              </p>
              <div className="demo-notice">
                <strong>Это демонстрация оформления</strong>
                <p>
                  Заказ не отправлен в пекарню. Вы можете сохранить список
                  покупок. Оплата не требуется.
                </p>
              </div>
              <button className="button primary" onClick={download}>
                Скачать список <Download size={18} />
              </button>
              <button
                className="text-button back-link"
                onClick={() => setComplete(false)}
              >
                Вернуться к заказу
              </button>
            </div>
          ) : (
            <>
              <div className="cart-body">
                {!checkout ? (
                  <>
                    <p className="cart-intro">
                      Маленький план на вкусное завтра.
                    </p>
                    <div className="cart-items">
                      {products
                        .filter((p) => cart[p.id])
                        .map((p) => (
                          <div className="cart-item" key={p.id}>
                            <img src={"/images/" + p.image + ".jpg"} alt="" />
                            <div className="cart-item-info">
                              <h3>{p.name}</h3>
                              <span className="weight">{p.weight}</span>
                              <div className="quantity">
                                <button
                                  aria-label={"Уменьшить количество: " + p.name}
                                  onClick={() => change(p.id, -1)}
                                >
                                  <Minus size={14} />
                                </button>
                                <span>{cart[p.id]}</span>
                                <button
                                  disabled={cart[p.id] >= 20}
                                  aria-label={"Увеличить количество: " + p.name}
                                  onClick={() => change(p.id, 1)}
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="cart-item-end">
                              <strong>{rub(p.price * cart[p.id])}</strong>
                              <button
                                className="text-button remove"
                                onClick={() => {
                                  setCart((c) => {
                                    const next = { ...c };
                                    delete next[p.id];
                                    return next;
                                  });
                                }}
                                aria-label={"Удалить: " + p.name}
                              >
                                Убрать
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <form
                    id="order-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (name.trim().length < 2) {
                        setFormError("Укажите имя — не меньше двух букв.");
                        return;
                      }
                      setFormError("");
                      setComplete(true);
                    }}
                    noValidate
                  >
                    <button
                      className="text-button back-link"
                      type="button"
                      onClick={() => setCheckout(false)}
                    >
                      ← К корзине
                    </button>
                    <div className="demo-notice">
                      <strong>Демонстрационный предзаказ</strong>
                      <p>
                        Соберите список для самовывоза. Он сохранится только у
                        вас и не отправится в пекарню.
                      </p>
                    </div>
                    <label htmlFor="customer-name">Как вас зовут</label>
                    <input
                      id="customer-name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setFormError("");
                      }}
                      autoComplete="given-name"
                      placeholder="Ваше имя"
                      maxLength={60}
                      aria-invalid={!!formError}
                      aria-describedby={formError ? "name-error" : undefined}
                    />
                    {formError && (
                      <p id="name-error" className="form-error" role="alert">
                        {formError}
                      </p>
                    )}
                    <label htmlFor="pickup-day">День самовывоза</label>
                    <div className="select-wrap">
                      <select
                        id="pickup-day"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                      >
                        <option value="1">Завтра, {tomorrow(1)}</option>
                        <option value="2">Послезавтра, {tomorrow(2)}</option>
                      </select>
                      <ChevronDown size={18} />
                    </div>
                    <label htmlFor="pickup-time">Удобное время</label>
                    <div className="select-wrap">
                      <select
                        id="pickup-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        {[
                          "09:00–11:00",
                          "11:00–13:00",
                          "13:00–16:00",
                          "16:00–19:00",
                        ].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} />
                    </div>
                    <p className="form-note">
                      В вашем списке {count} шт. На сумму {rub(total)}.
                    </p>
                  </form>
                )}
              </div>
              <div className="cart-summary">
                <div className="total">
                  <span>Итого</span>
                  <strong>{rub(total)}</strong>
                </div>
                {checkout ? (
                  <button
                    form="order-form"
                    type="submit"
                    className="button primary"
                  >
                    Собрать предзаказ
                    <ArrowRight size={19} />
                  </button>
                ) : (
                  <button
                    className="button primary"
                    onClick={() => setCheckout(true)}
                  >
                    Выбрать время самовывоза
                    <ArrowRight size={19} />
                  </button>
                )}
                <p>Демо · Без оплаты и отправки заказа</p>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
