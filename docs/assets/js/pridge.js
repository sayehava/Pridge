(() => {
      "use strict";

      const endpoints = {
        "plugin-jobs": {
          group: "plugin",
          method: "POST",
          path: "/api/plugin/jobs",
          title: "Submit a print job",
          description: "Receives the original raw print payload for an authenticated virtual printer endpoint.",
          auth: "Endpoint bearer token",
          type: "application/octet-stream",
          request: `curl -X POST "https://print.example.com/api/plugin/jobs" \\
  -H "Authorization: Bearer ENDPOINT_TOKEN" \\
  -H "Content-Type: application/octet-stream" \\
  -H 'X-PrintBridge-Metadata: {"source":"woocommerce","order_id":"1001"}' \\
  --data-binary @receipt.bin`,
          response: `{
  "job_id": 123,
  "status": "pending"
}`,
          note: "The request body is stored as raw bytes. Keep tokens out of URLs and query strings."
        },
        "plugin-clients": {
          group: "plugin",
          method: "POST",
          path: "/api/plugin/clients",
          title: "List assigned clients",
          description: "Returns clients assigned to the endpoint authenticated by the endpoint token.",
          auth: "Endpoint bearer token",
          type: "application/json",
          request: `curl -X POST "https://print.example.com/api/plugin/clients" \\
  -H "Authorization: Bearer ENDPOINT_TOKEN" \\
  -H "Accept: application/json"`,
          response: `{
  "clients": [
    {"id": 2, "name": "Warehouse Laptop", "enabled": true}
  ]
}`,
          note: "Useful for connectors that need to display or verify which office clients can serve an endpoint."
        },
        "client-auth": {
          group: "client",
          method: "POST",
          path: "/api/client/auth",
          title: "Authenticate a client",
          description: "Exchanges a long-lived client token for a temporary bearer token used by the client API.",
          auth: "Client token in JSON body",
          type: "application/json",
          request: `curl -X POST "https://print.example.com/api/client/auth" \\
  -H "Content-Type: application/json" \\
  -d '{"token":"CLIENT_TOKEN"}'`,
          response: `{
  "token": "TEMPORARY_SESSION_TOKEN",
  "token_type": "Bearer",
  "expires_in": 86400,
  "client": {"id": 2, "name": "Warehouse Laptop"}
}`,
          note: "If a later client request returns 401, authenticate again with the stored client token."
        },
        "client-jobs": {
          group: "client",
          method: "GET",
          path: "/api/client/jobs",
          title: "List jobs and recent status",
          description: "Lists jobs assigned to the authenticated client together with recent queue status.",
          auth: "Temporary bearer token",
          type: "application/json",
          request: `curl "https://print.example.com/api/client/jobs" \\
  -H "Authorization: Bearer TEMPORARY_SESSION_TOKEN"`,
          response: `{
  "jobs": [
    {"id":123,"endpoint_id":1,"status":"pending","created_at":"2026-07-09 10:20:00"}
  ]
}`,
          note: "Use this route for status displays and recent-job UI. Reserve work through the dedicated reserve route."
        },
        "client-endpoints-get": {
          group: "client",
          method: "GET",
          path: "/api/client/endpoints",
          title: "List virtual printer endpoints",
          description: "Returns all virtual printer endpoints and their current assignment state for the authenticated client.",
          auth: "Temporary bearer token",
          type: "application/json",
          request: `curl "https://print.example.com/api/client/endpoints" \\
  -H "Authorization: Bearer TEMPORARY_SESSION_TOKEN"`,
          response: `{
  "endpoints": [
    {"id":1,"name":"Receipt Printer","assigned":true,"enabled":true}
  ]
}`,
          note: "Desktop clients use this list to build the remote-to-local printer mapping interface."
        },
        "client-endpoints-put": {
          group: "client",
          method: "PUT",
          path: "/api/client/endpoints",
          title: "Synchronize endpoint assignments",
          description: "Updates the endpoint assignments belonging to the authenticated client.",
          auth: "Temporary bearer token",
          type: "application/json",
          request: `curl -X PUT "https://print.example.com/api/client/endpoints" \\
  -H "Authorization: Bearer TEMPORARY_SESSION_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"endpoint_ids":[1,3,5]}'`,
          response: `{
  "ok": true,
  "endpoint_ids": [1,3,5]
}`,
          note: "Assignments may also be managed from the server admin UI."
        },
        "reserve": {
          group: "client",
          method: "POST",
          path: "/api/client/jobs/reserve",
          title: "Reserve the next pending job",
          description: "Atomically reserves one pending assigned job and returns its original payload as base64.",
          auth: "Temporary bearer token",
          type: "application/json",
          request: `curl -X POST "https://print.example.com/api/client/jobs/reserve" \\
  -H "Authorization: Bearer TEMPORARY_SESSION_TOKEN"`,
          response: `{
  "job": {
    "id": 123,
    "endpoint_id": 1,
    "content_type": "application/octet-stream",
    "metadata": {"source":"woocommerce","order_id":"1001"},
    "status": "reserved",
    "payload_base64": "BASE64_ENCODED_RAW_PAYLOAD"
  }
}`,
          note: "Decode payload_base64 and send the resulting bytes without changing line endings or character encoding."
        },
        "printing": {
          group: "client",
          method: "POST",
          path: "/api/client/jobs/{id}/printing",
          title: "Mark a job as printing",
          description: "Confirms that the client has begun handing the reserved job to the selected local printer.",
          auth: "Temporary bearer token",
          type: "application/json",
          request: `curl -X POST "https://print.example.com/api/client/jobs/123/printing" \\
  -H "Authorization: Bearer TEMPORARY_SESSION_TOKEN"`,
          response: `{
  "id": 123,
  "status": "printing"
}`,
          note: "Send this after reserving and immediately before invoking the operating-system print API."
        },
        "printed": {
          group: "client",
          method: "POST",
          path: "/api/client/jobs/{id}/printed",
          title: "Confirm successful printing",
          description: "Marks the job as printed after the local print call succeeds.",
          auth: "Temporary bearer token",
          type: "application/json",
          request: `curl -X POST "https://print.example.com/api/client/jobs/123/printed" \\
  -H "Authorization: Bearer TEMPORARY_SESSION_TOKEN"`,
          response: `{
  "id": 123,
  "status": "printed"
}`,
          note: "Printed jobs leave the waiting queue by status but remain available in the archive."
        },
        "failed": {
          group: "client",
          method: "POST",
          path: "/api/client/jobs/{id}/failed",
          title: "Report a failed print",
          description: "Marks the job as failed and optionally stores a short, safe error message.",
          auth: "Temporary bearer token",
          type: "application/json",
          request: `curl -X POST "https://print.example.com/api/client/jobs/123/failed" \\
  -H "Authorization: Bearer TEMPORARY_SESSION_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"error":"Printer is offline"}'`,
          response: `{
  "id": 123,
  "status": "failed"
}`,
          note: "Do not include filesystem paths, secrets, full tokens or raw print payloads in error messages."
        },
        "heartbeat": {
          group: "client",
          method: "POST",
          path: "/api/client/heartbeat",
          title: "Update client heartbeat",
          description: "Tells the server that the authenticated desktop client is still running and reachable.",
          auth: "Temporary bearer token",
          type: "application/json",
          request: `curl -X POST "https://print.example.com/api/client/heartbeat" \\
  -H "Authorization: Bearer TEMPORARY_SESSION_TOKEN"`,
          response: `{
  "ok": true,
  "heartbeat_at": "2026-07-13 18:30:00"
}`,
          note: "A 30-second heartbeat interval is a sensible default for a continuously running office client."
        }
      };

      const $ = (selector, root = document) => root.querySelector(selector);
      const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

      const toast = (message) => {
        const stack = $("#toastStack");
        const item = document.createElement("div");
        item.className = "toast";
        item.textContent = message;
        stack.appendChild(item);
        setTimeout(() => item.remove(), 2600);
      };

      const safeCopy = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          toast("Copied to clipboard");
        } catch {
          const area = document.createElement("textarea");
          area.value = text;
          area.style.position = "fixed";
          area.style.opacity = "0";
          document.body.appendChild(area);
          area.select();
          document.execCommand("copy");
          area.remove();
          toast("Copied to clipboard");
        }
      };

      $$(".copy-code").forEach(button => {
        button.addEventListener("click", () => {
          const target = document.getElementById(button.dataset.copyTarget);
          if (target) safeCopy(target.textContent);
        });
      });

      // Dialogs
      $$("[data-modal]").forEach(trigger => {
        trigger.addEventListener("click", () => {
          const dialog = document.getElementById(trigger.dataset.modal);
          if (!dialog) return;
          dialog.showModal();
          document.body.classList.add("modal-open");
        });
      });

      $$("dialog").forEach(dialog => {
        dialog.addEventListener("click", event => {
          if (event.target === dialog) dialog.close();
        });
        dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
      });

      $$("[data-close]").forEach(button => {
        button.addEventListener("click", () => button.closest("dialog")?.close());
      });

      document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
          const open = $("dialog[open]");
          if (open) open.close();
        }
      });

      // Mobile navigation
      const menuButton = $("#menuButton");
      const nav = $("#nav");
      menuButton.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(open));
      });
      $$("#nav a, #nav button").forEach(item => item.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }));

      // Active section navigation
      const sectionLinks = $$('#nav a[href^="#"]');
      const observedSections = sectionLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
      const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          sectionLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        });
      }, {rootMargin: "-35% 0px -55% 0px"});
      observedSections.forEach(section => sectionObserver.observe(section));

      // Reveal animation
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, {threshold: .12});
      $$(".reveal").forEach(element => revealObserver.observe(element));

      // Endpoint explorer
      const endpointItems = $$(".endpoint-item");
      const methodClass = method => method.toLowerCase();

      const showEndpoint = (key) => {
        const data = endpoints[key];
        if (!data) return;
        endpointItems.forEach(item => item.classList.toggle("active", item.dataset.endpoint === key));
        $("#endpointTitle").textContent = data.title;
        $("#endpointDescription").textContent = data.description;
        $("#endpointPath").textContent = data.path;
        $("#endpointAuth").textContent = data.auth;
        $("#endpointType").textContent = data.type;
        $("#requestCode").textContent = data.request;
        $("#responseCode").textContent = data.response;
        $("#endpointNote").textContent = data.note;
        const method = $("#endpointMethod");
        method.textContent = data.method;
        method.className = `method ${methodClass(data.method)}`;
      };

      endpointItems.forEach(item => item.addEventListener("click", () => showEndpoint(item.dataset.endpoint)));

      let apiGroup = "all";
      const filterEndpoints = () => {
        const term = $("#endpointSearch").value.trim().toLowerCase();
        let visible = 0;
        endpointItems.forEach(item => {
          const data = endpoints[item.dataset.endpoint];
          const matchesGroup = apiGroup === "all" || data.group === apiGroup;
          const haystack = `${data.method} ${data.path} ${data.title} ${data.description}`.toLowerCase();
          const matchesTerm = !term || haystack.includes(term);
          const show = matchesGroup && matchesTerm;
          item.classList.toggle("hidden", !show);
          if (show) visible++;
        });
        $("#endpointNoResults").classList.toggle("visible", visible === 0);
        const selected = $(".endpoint-item.active:not(.hidden)");
        if (!selected && visible) $(".endpoint-item:not(.hidden)")?.click();
      };

      $("#endpointSearch").addEventListener("input", filterEndpoints);

      $$("[data-api-group]").forEach(tab => {
        tab.addEventListener("click", () => {
          $$("[data-api-group]").forEach(t => {
            const active = t === tab;
            t.classList.toggle("active", active);
            t.setAttribute("aria-selected", String(active));
          });

          apiGroup = tab.dataset.apiGroup;
          const lifecycle = apiGroup === "lifecycle";
          $("#apiGrid").style.display = lifecycle ? "none" : "grid";
          $("#lifecyclePanel").style.display = lifecycle ? "block" : "none";

          if (!lifecycle) filterEndpoints();
        });
      });

      // Docs
      const activateDoc = (key) => {
        $$(".doc-link").forEach(link => link.classList.toggle("active", link.dataset.doc === key));
        $$(".doc-panel").forEach(panel => panel.classList.toggle("active", panel.dataset.docPanel === key));
      };
      $$(".doc-link").forEach(link => link.addEventListener("click", () => activateDoc(link.dataset.doc)));

      $("#docSearch").addEventListener("input", event => {
        const term = event.target.value.trim().toLowerCase();
        let firstMatch = null;
        $$(".doc-link").forEach(link => {
          const key = link.dataset.doc;
          const panel = $(`[data-doc-panel="${key}"]`);
          const haystack = `${link.textContent} ${panel?.textContent || ""}`.toLowerCase();
          const match = !term || haystack.includes(term);
          link.classList.toggle("filtered-out", !match);
          if (match && !firstMatch) firstMatch = link;
        });
        if (term && firstMatch) firstMatch.click();
      });

      // Request builder
      const builderTemplates = {
        "plugin-jobs": ({base, token}) => `curl -X POST "${base}/api/plugin/jobs" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/octet-stream" \\
  --data-binary @document.bin`,
        "client-auth": ({base, token}) => `curl -X POST "${base}/api/client/auth" \\
  -H "Content-Type: application/json" \\
  -d '{"token":"${token}"}'`,
        "reserve": ({base, token}) => `curl -X POST "${base}/api/client/jobs/reserve" \\
  -H "Authorization: Bearer ${token}"`,
        "heartbeat": ({base, token}) => `curl -X POST "${base}/api/client/heartbeat" \\
  -H "Authorization: Bearer ${token}"`
      };

      const buildRequest = () => {
        const base = $("#tryBaseUrl").value.trim().replace(/\/+$/, "") || "https://print.example.com";
        const token = $("#tryToken").value.trim() || "YOUR_TOKEN";
        const route = $("#tryRoute").value;
        $("#tryCode").textContent = builderTemplates[route]({base, token});
      };
      $("#tryForm").addEventListener("submit", event => {
        event.preventDefault();
        buildRequest();
        toast("Request generated");
      });
      $("#tryRoute").addEventListener("change", buildRequest);

      // Hero pointer parallax
      const heroVisual = $("#heroVisual");
      const heroFrame = $("#heroFrame");
      if (matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        heroVisual.addEventListener("pointermove", event => {
          const rect = heroVisual.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - .5;
          const y = (event.clientY - rect.top) / rect.height - .5;
          heroFrame.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(4px)`;
        });
        heroVisual.addEventListener("pointerleave", () => heroFrame.style.transform = "");
      }

      // Command palette
      const commands = [
        {label:"Home", hint:"Section", symbol:"⌂", action:() => location.hash = "home"},
        {label:"How it works", hint:"Section", symbol:"→", action:() => location.hash = "how"},
        {label:"Repositories", hint:"Section", symbol:"⌘", action:() => location.hash = "repositories"},
        {label:"Endpoint explorer", hint:"Section", symbol:"API", action:() => location.hash = "api"},
        {label:"Documentation", hint:"Section", symbol:"?", action:() => location.hash = "docs"},
        {label:"Quick start", hint:"Modal", symbol:"⚡", action:() => $("#quickStartModal").showModal()},
        {label:"About Pridge", hint:"Modal", symbol:"i", action:() => $("#aboutModal").showModal()},
        {label:"Design language", hint:"Page", symbol:"◆", action:() => location.href = "design.html"},
        {label:"Server repository", hint:"GitHub", symbol:"☁", action:() => window.open("https://github.com/sayehava/Pridge-Server","_blank","noopener")},
        {label:"Client repository", hint:"GitHub", symbol:"▣", action:() => window.open("https://github.com/sayehava/Pridge-Client","_blank","noopener")},
        ...Object.entries(endpoints).map(([key, data]) => ({
          label: `${data.method} ${data.path}`,
          hint: data.title,
          symbol: data.method,
          action: () => {
            location.hash = "api";
            showEndpoint(key);
          }
        }))
      ];

      const commandDialog = $("#commandDialog");
      const commandInput = $("#commandInput");
      const commandResults = $("#commandResults");

      const renderCommands = () => {
        const query = commandInput.value.trim().toLowerCase();
        const filtered = commands.filter(command => `${command.label} ${command.hint}`.toLowerCase().includes(query)).slice(0, 12);
        commandResults.innerHTML = "";
        filtered.forEach((command, index) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = `command-item${index === 0 ? " selected" : ""}`;
          button.innerHTML = `<span class="command-symbol"></span><span><strong></strong><br><small></small></span><span class="kbd">↵</span>`;
          $(".command-symbol", button).textContent = command.symbol;
          $("strong", button).textContent = command.label;
          $("small", button).textContent = command.hint;
          button.addEventListener("click", () => {
            commandDialog.close();
            command.action();
          });
          commandResults.appendChild(button);
        });
        if (!filtered.length) commandResults.innerHTML = `<div style="padding:25px;color:var(--muted);text-align:center">No results</div>`;
      };

      const openCommand = () => {
        commandInput.value = "";
        renderCommands();
        commandDialog.showModal();
        setTimeout(() => commandInput.focus(), 40);
      };

      $("#openCommand").addEventListener("click", openCommand);
      commandInput.addEventListener("input", renderCommands);
      commandInput.addEventListener("keydown", event => {
        const items = $$(".command-item", commandResults);
        let selected = items.findIndex(item => item.classList.contains("selected"));
        if (event.key === "ArrowDown" && items.length) {
          event.preventDefault();
          items[selected]?.classList.remove("selected");
          selected = (selected + 1) % items.length;
          items[selected].classList.add("selected");
          items[selected].scrollIntoView({block:"nearest"});
        } else if (event.key === "ArrowUp" && items.length) {
          event.preventDefault();
          items[selected]?.classList.remove("selected");
          selected = (selected - 1 + items.length) % items.length;
          items[selected].classList.add("selected");
          items[selected].scrollIntoView({block:"nearest"});
        } else if (event.key === "Enter") {
          event.preventDefault();
          $(".command-item.selected", commandResults)?.click();
        }
      });

      document.addEventListener("keydown", event => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          commandDialog.open ? commandDialog.close() : openCommand();
        }
      });

      // Animated network canvas
      const canvas = $("#network");
      const ctx = canvas.getContext("2d");
      let nodes = [];
      let animationFrame;
      let dpr = Math.min(devicePixelRatio || 1, 2);

      const resizeCanvas = () => {
        dpr = Math.min(devicePixelRatio || 1, 2);
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        canvas.style.width = `${innerWidth}px`;
        canvas.style.height = `${innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(64, Math.max(24, Math.floor(innerWidth / 24)));
        nodes = Array.from({length: count}, () => ({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          vx: (Math.random() - .5) * .18,
          vy: (Math.random() - .5) * .18,
          r: Math.random() * 1.3 + .45
        }));
      };

      const drawNetwork = () => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        nodes.forEach((node, i) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -30) node.x = innerWidth + 30;
          if (node.x > innerWidth + 30) node.x = -30;
          if (node.y < -30) node.y = innerHeight + 30;
          if (node.y > innerHeight + 30) node.y = -30;

          ctx.beginPath();
          ctx.fillStyle = i % 5 === 0 ? "rgba(255,148,24,.55)" : "rgba(34,211,238,.5)";
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 125) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(93,126,190,${(1 - dist / 125) * .12})`;
              ctx.lineWidth = .7;
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });
        animationFrame = requestAnimationFrame(drawNetwork);
      };

      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        resizeCanvas();
        drawNetwork();
        addEventListener("resize", resizeCanvas, {passive:true});
        document.addEventListener("visibilitychange", () => {
          if (document.hidden) cancelAnimationFrame(animationFrame);
          else drawNetwork();
        });
      }

      // External links get safe attributes even if added later.
      $$('a[target="_blank"]').forEach(link => link.rel = "noopener noreferrer");

      // Initial state
      showEndpoint("plugin-jobs");
    })();
