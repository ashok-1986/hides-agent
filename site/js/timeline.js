document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("radial-timeline");
  if (!container) return;

  const timelineData = [
    {
      id: 1,
      title: "Enquiry",
      date: "Step 1",
      content: "Initial contact, specifications, and requirements gathering.",
      category: "Planning",
      icon: "message-circle",
      relatedIds: [2],
      status: "completed",
      energy: 100,
    },
    {
      id: 2,
      title: "Swatches",
      date: "Step 2",
      content: "Review our core range in person to verify quality, texture, and colour accuracy.",
      category: "Design",
      icon: "palette",
      relatedIds: [1, 3],
      status: "completed",
      energy: 90,
    },
    {
      id: 3,
      title: "Sample",
      date: "Step 3",
      content: "Order a sample hide for your first prototype before committing to volume.",
      category: "Development",
      icon: "scissors",
      relatedIds: [2, 4],
      status: "in-progress",
      energy: 60,
    },
    {
      id: 4,
      title: "Bulk",
      date: "Step 4",
      content: "Consistent production supply delivered direct from the tannery to your studio.",
      category: "Production",
      icon: "package",
      relatedIds: [3, 5],
      status: "pending",
      energy: 30,
    },
    {
      id: 5,
      title: "Delivery",
      date: "Step 5",
      content: "Global logistics and final delivery directly to your facility.",
      category: "Release",
      icon: "truck",
      relatedIds: [4],
      status: "pending",
      energy: 10,
    },
  ];

  let expandedItems = {};
  let rotationAngle = 0;
  let autoRotate = true;
  let activeNodeId = null;
  let pulseEffect = {};
  let centerOffset = { x: 0, y: 0 };
  
  // Create UI
  container.className = "rt-container";
  container.innerHTML = `
    <div class="rt-orbit-wrapper">
      <div class="rt-center-pulse">
        <div class="rt-pulse-ring-1"></div>
        <div class="rt-pulse-ring-2"></div>
        <div class="rt-center-core"></div>
      </div>
      <div class="rt-orbit-ring"></div>
      <div id="rt-nodes-container" class="rt-nodes-container"></div>
    </div>
  `;

  const nodesContainer = document.getElementById("rt-nodes-container");
  
  // Initialize nodes once
  function initNodes() {
    nodesContainer.innerHTML = "";
    timelineData.forEach((item) => {
      const nodeEl = document.createElement("div");
      nodeEl.className = "rt-node";
      nodeEl.setAttribute("data-id", item.id);
      
      // Use mousedown to ensure it fires even if rotating fast, though we no longer destroy elements
      nodeEl.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        toggleItem(item.id);
      });
      
      nodesContainer.appendChild(nodeEl);
      updateNodeContent(item.id);
    });
  }

  function updateNodeContent(id) {
    const item = timelineData.find(t => t.id === id);
    const nodeEl = nodesContainer.querySelector(`.rt-node[data-id="${id}"]`);
    if (!nodeEl) return;
    
    const isExpanded = !!expandedItems[id];
    const isRelated = activeNodeId && timelineData.find(t => t.id === activeNodeId)?.relatedIds.includes(id);
    const isPulsing = !!pulseEffect[id];
    
    let nodeClass = "rt-node";
    if (isExpanded) nodeClass += " expanded";
    else if (isRelated) nodeClass += " related";
    nodeEl.className = nodeClass;
    
    nodeEl.innerHTML = `
      ${isPulsing ? `<div class="rt-node-pulse" style="width:${item.energy*0.5+40}px; height:${item.energy*0.5+40}px; left:-${(item.energy*0.5)/2}px; top:-${(item.energy*0.5)/2}px;"></div>` : ''}
      <div class="rt-icon-wrapper">
        <i data-lucide="${item.icon}" style="width:16px;height:16px;"></i>
      </div>
      <div class="rt-node-title">${item.title}</div>
      ${isExpanded ? renderCard(item) : ''}
    `;
    
    if (window.lucide) {
      window.lucide.createIcons({ root: nodeEl });
    }
  }

  // Render nodes (called every frame)
  function updateNodes() {
    const total = timelineData.length;
    timelineData.forEach((item, index) => {
      const nodeEl = nodesContainer.querySelector(`.rt-node[data-id="${item.id}"]`);
      if (!nodeEl) return;
      
      const angle = ((index / total) * 360 + rotationAngle) % 360;
      const radius = 180;
      const radian = (angle * Math.PI) / 180;
      
      const x = radius * Math.cos(radian) + centerOffset.x;
      const y = radius * Math.sin(radian) + centerOffset.y;
      const zIndex = Math.round(100 + 50 * Math.cos(radian));
      const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
      
      const isExpanded = !!expandedItems[item.id];
      
      nodeEl.style.transform = `translate(${x}px, ${y}px)`;
      nodeEl.style.zIndex = isExpanded ? 200 : zIndex;
      nodeEl.style.opacity = isExpanded ? 1 : opacity;
    });
  }

  function renderCard(item) {
    let statusClass = "status-" + item.status;
    let statusText = item.status === "completed" ? "COMPLETE" : (item.status === "in-progress" ? "IN PROGRESS" : "PENDING");
    
    let relatedHtml = "";
    if (item.relatedIds.length > 0) {
      const btns = item.relatedIds.map(rid => {
        const rItem = timelineData.find(i => i.id === rid);
        return `<button class="rt-related-btn" data-id="${rid}" onmousedown="event.stopPropagation(); window.toggleRelated(${rid})">${rItem.title} <i data-lucide="arrow-right" class="rt-sm-icon"></i></button>`;
      }).join("");
      
      relatedHtml = `
        <div class="rt-card-section" onmousedown="event.stopPropagation()">
          <div class="rt-card-section-title"><i data-lucide="link" class="rt-sm-icon"></i> Connected Nodes</div>
          <div class="rt-related-btns">${btns}</div>
        </div>
      `;
    }
    
    return `
      <div class="rt-card" onmousedown="event.stopPropagation()">
        <div class="rt-card-line"></div>
        <div class="rt-card-header">
          <span class="rt-badge ${statusClass}">${statusText}</span>
          <span class="rt-date">${item.date}</span>
        </div>
        <div class="rt-card-title">${item.title}</div>
        <div class="rt-card-content">${item.content}</div>
        <div class="rt-card-section">
          <div class="rt-energy-row">
            <span><i data-lucide="zap" class="rt-sm-icon"></i> Energy Level</span>
            <span>${item.energy}%</span>
          </div>
          <div class="rt-energy-bar"><div class="rt-energy-fill" style="width: ${item.energy}%"></div></div>
        </div>
        ${relatedHtml}
      </div>
    `;
  }

  // Global function for related buttons since we inject via HTML string
  window.toggleRelated = function(rid) {
    toggleItem(rid);
  };

  function centerViewOnNode(nodeId) {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    rotationAngle = 270 - targetAngle;
  }

  function toggleItem(id) {
    if (expandedItems[id]) {
      expandedItems = {};
      activeNodeId = null;
      pulseEffect = {};
      autoRotate = true;
    } else {
      expandedItems = { [id]: true };
      activeNodeId = id;
      autoRotate = false;
      
      const rIds = timelineData.find(t => t.id === id).relatedIds;
      pulseEffect = {};
      rIds.forEach(rid => pulseEffect[rid] = true);
      
      centerViewOnNode(id);
    }
    // Update content for all nodes to reflect new state
    timelineData.forEach(t => updateNodeContent(t.id));
    updateNodes();
  }

  container.addEventListener("mousedown", (e) => {
    if (e.target.closest('.rt-card') || e.target.closest('.rt-icon-wrapper')) return;
    expandedItems = {};
    activeNodeId = null;
    pulseEffect = {};
    autoRotate = true;
    timelineData.forEach(t => updateNodeContent(t.id));
    updateNodes();
  });

  // Animation Loop
  function tick() {
    if (autoRotate) {
      rotationAngle = (rotationAngle + 0.2) % 360;
      updateNodes();
    }
    requestAnimationFrame(tick);
  }
  
  // Initial setup
  initNodes();
  updateNodes();
  requestAnimationFrame(tick);
});
