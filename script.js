// Add mobile menu behavior only when the matching HTML controls are present.
// Keep the desktop wordmark legible over the hero, then settle it onto a solid bar.
(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let ticking = false;
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 32);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
  updateHeader();
})();

(() => {
  const header = document.querySelector(".site-header");
  const menuButton = header?.querySelector(".menu-toggle");
  const navigation = header?.querySelector("#primary-navigation");
  const buttonLabel = menuButton?.querySelector(".menu-toggle__label");

  if (!header || !menuButton || !navigation || !buttonLabel) {
    return;
  }

  const mobileWidth = window.matchMedia("(max-width: 860px)");

  function setMenuOpen(requestedOpen, returnFocus = false) {
    const isOpen = mobileWidth.matches && requestedOpen;

    menuButton.hidden = !mobileWidth.matches;
    navigation.hidden = mobileWidth.matches && !isOpen;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    buttonLabel.textContent = isOpen ? "Close menu" : "Open menu";
    header.classList.toggle("menu-open", isOpen);

    if (returnFocus && mobileWidth.matches) {
      menuButton.focus();
    }
  }

  // On small screens the menu starts closed. On wider screens it stays visible.
  setMenuOpen(false);

  menuButton.addEventListener("click", () => {
    const currentlyOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!currentlyOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (!mobileWidth.matches || !(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest("a");
    if (!link) {
      return;
    }

    const href = link.getAttribute("href");
    const destinationId = href?.startsWith("#") ? href.slice(1) : "";
    const destination = destinationId ? document.getElementById(destinationId) : null;
    setMenuOpen(false);

    // Move keyboard focus to the section the link opened, without another scroll.
    if (destination) {
      if (!destination.hasAttribute("tabindex")) {
        destination.setAttribute("tabindex", "-1");
      }
      window.setTimeout(() => destination.focus({ preventScroll: true }), 0);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });

  // Reset the menu whenever the viewport crosses the mobile breakpoint.
  mobileWidth.addEventListener("change", () => setMenuOpen(false));
})();

// Play the supplied newsroom loop behind the homepage portrait when motion is allowed.
(() => {
  const video = document.querySelector("[data-homepage-background-video]");
  const background = window.BRUCE_CONTENT?.mediaArchive?.homepageBackgroundVideo;
  if (!video || !background?.playbackUrl) return;

  video.poster = background.poster || "";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData) {
    return;
  }

  const play = () => video.play().catch(() => {});
  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = background.playbackUrl;
    video.addEventListener("loadedmetadata", play, { once: true });
    video.load();
    return;
  }

  const attachHls = () => {
    if (!window.Hls?.isSupported()) return;
    const player = new window.Hls({ capLevelToPlayerSize: true, maxBufferLength: 8, maxMaxBufferLength: 12 });
    player.loadSource(background.playbackUrl);
    player.attachMedia(video);
    player.on(window.Hls.Events.MANIFEST_PARSED, play);
    player.on(window.Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        player.destroy();
        video.hidden = true;
      }
    });
  };

  if (window.Hls) {
    attachHls();
    return;
  }

  const loader = document.createElement("script");
  loader.src = "https://cdn.jsdelivr.net/npm/hls.js@1.7.3/dist/hls.min.js";
  loader.async = true;
  loader.onload = attachHls;
  loader.onerror = () => { video.hidden = true; };
  document.head.append(loader);
})();

// Populate the homepage from its verified content configuration.
(() => {
  const content = window.BRUCE_CONTENT;
  const home = document.body.classList.contains("home-page");
  if (!home || !content) return;

  const textAt = (path) => path.split(".").reduce((value, key) => value?.[key], content);
  document.querySelectorAll("[data-content]").forEach((element) => {
    const value = textAt(element.dataset.content);
    if (typeof value === "string") element.textContent = value;
  });

  const photoAt = (key) => content.photographs.find((photo) => photo.key === key);
  document.querySelectorAll("[data-image]").forEach((image) => {
    const photo = photoAt(image.dataset.image);
    if (!photo) return;
    image.src = photo.src;
    image.alt = photo.alt;
  });

  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const link = (href, label, className = "") => {
    const element = node("a", className, label);
    element.href = href;
    return element;
  };
  const imageFor = (key, className, decorative = false) => {
    const photo = photoAt(key);
    const image = node("img", className);
    image.src = photo.src;
    image.alt = decorative ? "" : photo.alt;
    image.loading = "lazy";
    image.decoding = "async";
    return image;
  };

  const highlightsRoot = document.querySelector("#professional-highlights");
  if (highlightsRoot) {
    const experience = content.professionalExperience;
    const highlights = [
      {
        number: "01",
        label: "Journalism & media production",
        title: "Reporting with a digital lens",
        description: experience.journalismAndMediaProduction.overview,
        image: "speaking"
      },
      {
        number: "02",
        label: "Leadership",
        title: content.leadership.role,
        description: `${content.leadership.journey} ${content.leadership.responsibilities}`,
        image: "panel"
      },
      {
        number: "03",
        label: "Professional development",
        title: content.engagements[0].name,
        description: `${content.engagements[0].dates} · ${content.engagements[0].venue}. ${content.engagements[0].details}`,
        image: "summit"
      },
      {
        number: "04",
        label: "Awards & recognition",
        title: content.awardsAndCertificates[0].name,
        description: content.awardsAndCertificates[0].details,
        image: "award"
      }
    ];

    highlights.forEach((item) => {
      const card = node("article", "home-highlight-card home-reveal");
      card.append(node("span", "home-highlight-card__number", item.number));
      const picture = node("div", "home-highlight-card__image");
      picture.append(imageFor(item.image, "", true));
      card.append(picture);
      const copy = node("div", "home-highlight-card__copy");
      copy.append(node("p", "home-kicker", item.label));
      copy.append(node("h3", "", item.title));
      copy.append(node("p", "home-highlight-card__description", item.description));
      card.append(copy);
      highlightsRoot.append(card);
    });
  }

  const directoriesRoot = document.querySelector("#publication-directories");
  if (directoriesRoot) {
    const labels = [
      ["epicPulseMagazine", "EpicPulse Magazine", "Explore EpicPulse"],
      ["dataPointDaily", "DataPoint Daily", "Meet the contributors"],
      ["theBoldEastAfrica", "The Bold East Africa", "Explore the publication"],
      ["zetechUniversity", "Zetech University", "University website"]
    ];
    labels.forEach(([key, title, note]) => {
      const href = content.publications.authorAndPublicationLinks[key];
      const item = link(href, "", "publication-directory-card");
      item.append(node("strong", "", title));
      item.append(node("span", "", note));
      item.append(node("span", "publication-directory-card__arrow", "↗"));
      item.target = "_blank";
      item.rel = "noopener noreferrer";
      directoriesRoot.append(item);
    });
  }

  const galleryRoot = document.querySelector("#home-gallery-grid");
  if (galleryRoot) {
    content.photographs.forEach((photo, index) => {
      const figure = node("figure", `home-gallery-item home-gallery-item--${index + 1}`);
      const anchor = link("pages/gallery.html", "", "home-gallery-item__link");
      anchor.setAttribute("aria-label", `Open gallery: ${photo.caption}`);
      anchor.append(imageFor(photo.key, ""));
      const caption = node("figcaption", "home-gallery-item__caption");
      caption.append(node("span", "", photo.caption));
      caption.append(node("span", "home-gallery-item__arrow", "↗"));
      anchor.append(caption);
      figure.append(anchor);
      galleryRoot.append(figure);
    });
  }

  const socialRoot = document.querySelector("#home-social-links");
  if (socialRoot) {
    [
      ["LinkedIn", content.contacts.linkedin],
      ["Instagram", content.contacts.instagram],
      ["X", content.contacts.x],
      ["Facebook", content.contacts.facebook]
    ].forEach(([label, href]) => {
      const social = link(href, label);
      social.target = "_blank";
      social.rel = "noopener noreferrer";
      socialRoot.append(social);
    });
  }

  const email = document.querySelector("[data-contact-email]");
  if (email) {
    email.href = `mailto:${content.contacts.email}`;
    email.textContent = content.contacts.email;
  }
})();

// Open the selected gallery photo in a native, keyboard-accessible dialog.
(() => {
  const dialog = document.querySelector(".gallery-lightbox");
  const dialogImage = dialog?.querySelector(".gallery-lightbox__image");
  const dialogCaption = dialog?.querySelector(".gallery-lightbox__caption");
  const closeButton = dialog?.querySelector(".gallery-lightbox__close");
  const previousButton = dialog?.querySelector(".gallery-lightbox__previous");
  const nextButton = dialog?.querySelector(".gallery-lightbox__next");
  const counter = dialog?.querySelector(".gallery-lightbox__counter");

  if (
    !(dialog instanceof HTMLDialogElement) ||
    !dialogImage ||
    !dialogCaption ||
    !closeButton ||
    !previousButton ||
    !nextButton ||
    !counter
  ) {
    return;
  }

  const photos = Array.from(document.querySelectorAll(".gallery-photo-button"))
    .map((button) => ({ button, image: button.querySelector("img") }))
    .filter((photo) => photo.image);

  if (!photos.length) {
    return;
  }

  let currentIndex = -1;
  let swipeStart = null;
  let returnFocusTo = null;

  function showPhoto(index) {
    currentIndex = (index + photos.length) % photos.length;
    const { image, button } = photos[currentIndex];
    const caption = button.closest("figure")?.querySelector("figcaption");
    const captionParts = caption
      ? Array.from(caption.querySelectorAll("span"))
          .map((part) => part.textContent.trim())
          .filter(Boolean)
      : [];

    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogImage.removeAttribute("aria-hidden");
    dialogCaption.textContent = captionParts.join(" ") || caption?.textContent?.trim() || image.alt;
    counter.textContent = `${currentIndex + 1} of ${photos.length}`;
  }

  photos.forEach(({ button }, index) => {
    button.addEventListener("click", () => {
      returnFocusTo = button;
      showPhoto(index);
      dialog.showModal();
      closeButton.focus();
    });
  });

  previousButton.addEventListener("click", () => showPhoto(currentIndex - 1));
  nextButton.addEventListener("click", () => showPhoto(currentIndex + 1));
  closeButton.addEventListener("click", () => dialog.close());

  // Arrow keys browse photos while focus is inside the open dialog.
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(currentIndex + 1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
    }
  });

  // A click on the dim backdrop closes the viewer; clicks inside do not.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  // A horizontal touch swipe browses photos; vertical page gestures remain native.
  dialogImage.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" && event.isPrimary) {
      swipeStart = { x: event.clientX, y: event.clientY };
    }
  });

  dialogImage.addEventListener("pointerup", (event) => {
    if (!swipeStart || event.pointerType !== "touch") {
      return;
    }

    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;
    swipeStart = null;

    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      showPhoto(currentIndex + (deltaX < 0 ? 1 : -1));
    }
  });

  dialogImage.addEventListener("pointercancel", () => {
    swipeStart = null;
  });

  // Escape closes a native dialog automatically. Remove its image after closing.
  dialog.addEventListener("close", () => {
    dialogImage.removeAttribute("src");
    dialogImage.alt = "";
    dialogImage.setAttribute("aria-hidden", "true");
    dialogCaption.textContent = "";
    counter.textContent = "";
    currentIndex = -1;
    swipeStart = null;
    if (returnFocusTo?.isConnected) returnFocusTo.focus();
    returnFocusTo = null;
  });
})();

// Reveal major sections gently as they enter the screen. If this browser does
// not support IntersectionObserver, or the visitor prefers reduced motion,
// the content remains visible without animation.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    return;
  }

  const revealTargets = document.querySelectorAll(
    ".content-section, .about-page-section, .about-recognition, " +
      ".recognition-band, .contact-preview, .about-next, .media-next, " +
      ".gallery-next, .contact-page-details, .home-reveal, .home-highlight-card"
  );

  if (!revealTargets.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.reveal = "visible";
          activeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
  );

  // Add the animation state only after the observer is ready, so a failure
  // never leaves page content hidden.
  document.documentElement.classList.add("motion-ready");
  revealTargets.forEach((element) => {
    element.dataset.reveal = "pending";
    observer.observe(element);
  });
})();

// Render the verified YouTube collection from the central content file.
(() => {
  const videoRoot = document.querySelector("#watch-video-grid");
  if (!videoRoot) return;

  const videos = window.BRUCE_CONTENT?.mediaArchive?.videos || [];
  const fragment = document.createDocumentFragment();

  videos.forEach((video, index) => {
    const id = typeof video.youtubeId === "string" ? video.youtubeId : "";
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;

    let watchUrl;
    try {
      watchUrl = new URL(video.youtubeUrl);
    } catch {
      return;
    }

    if (
      watchUrl.protocol !== "https:" ||
      !["youtube.com", "www.youtube.com"].includes(watchUrl.hostname) ||
      watchUrl.pathname !== "/watch" ||
      watchUrl.searchParams.get("v") !== id
    ) {
      return;
    }

    const card = document.createElement("article");
    card.className = "watch-video-card";

    const player = document.createElement("div");
    player.className = "watch-video-card__player";

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    iframe.title = video.title
      ? `YouTube video: ${video.title}`
      : `YouTube video player ${index + 1} for Bruce Mahero`;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    player.append(iframe);
    card.append(player);

    const details = document.createElement("div");
    details.className = "watch-video-card__details";
    const heading = document.createElement("h3");
    heading.textContent = video.title || `Video ${index + 1}`;
    details.append(heading);

    if (video.description) {
      const description = document.createElement("p");
      description.textContent = video.description;
      details.append(description);
    }

    if (video.publishedDate) {
      const date = document.createElement("time");
      date.className = "watch-video-card__date";
      date.textContent = video.publishedDate;
      date.dateTime = video.publishedDate;
      details.append(date);
    }

    const link = document.createElement("a");
    link.className = "watch-text-link";
    link.href = video.youtubeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(document.createTextNode("Watch on YouTube "));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.append(arrow);
    details.append(link);
    card.append(details);
    fragment.append(card);
  });

  videoRoot.append(fragment);
})();

(() => {
  const form = document.querySelector(".contact-form");
  if (!(form instanceof HTMLFormElement)) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".contact-form__status");
  const honeypot = form.querySelector('input[name="_honey"]');
  const replyTo = form.querySelector('input[name="_replyto"]');
  const emailField = form.elements.namedItem("email");
  if (
    !(submitButton instanceof HTMLButtonElement) ||
    !(status instanceof HTMLElement) ||
    !(replyTo instanceof HTMLInputElement) ||
    !(emailField instanceof HTMLInputElement)
  ) return;

  const fields = [...form.querySelectorAll(".contact-form__field input, .contact-form__field textarea")];
  let hasSubmitted = false;
  form.noValidate = true;

  const validationMessage = (field) => {
    const value = field.value.trim();
    if (field.required && !value) return "Please complete this field.";
    if (field instanceof HTMLInputElement && field.type === "email" && value) {
      const emailValidator = document.createElement("input");
      emailValidator.type = "email";
      emailValidator.value = value;
      if (!emailValidator.validity.valid) return "Enter a valid email address.";
    }
    return "";
  };

  const setFieldError = (field, message) => {
    const error = field.parentElement?.querySelector(".contact-form__error");
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (!hasSubmitted) return;
      setFieldError(field, validationMessage(field));
      if (!fields.some((item) => item.getAttribute("aria-invalid") === "true")) {
        status.textContent = "";
        status.removeAttribute("data-state");
      }
    });
  });

  form.addEventListener("submit", (event) => {
    if (submitButton.disabled) return;

    let firstInvalidField;
    fields.forEach((field) => {
      field.value = field.value.trim();
      const message = validationMessage(field);
      setFieldError(field, message);
      if (message && !firstInvalidField) firstInvalidField = field;
    });
    hasSubmitted = true;
    if (firstInvalidField) {
      event.preventDefault();
      status.dataset.state = "error";
      status.textContent = "Please correct the highlighted fields and try again.";
      firstInvalidField.focus();
      return;
    }

    if (honeypot instanceof HTMLInputElement && honeypot.value) {
      event.preventDefault();
      status.dataset.state = "error";
      status.textContent = "Your message could not be submitted. Please leave the spam-check field empty.";
      return;
    }

    replyTo.value = emailField.value;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    status.removeAttribute("data-state");
    status.textContent = "Submitting your message to FormSubmit…";
  });
})();
