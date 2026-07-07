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
  
  // Render nodes
  function renderNodes() {
    nodesContainer.innerHTML = "";
    const total = timelineData.length;
    
    timelineData.forEach((item, index) => {
      const angle = ((index / total) * 360 + rotationAngle) % 360;
      const radius = 180;
      const radian = (angle * Math.PI) / 180;
      
      const x = radius * Math.cos(radian) + centerOffset.x;
      const y = radius * Math.sin(radian) + centerOffset.y;
      const zIndex = Math.round(100 + 50 * Math.cos(radian));
      const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
      
      const isExpanded = !!expandedItems[item.id];
      const isRelated = activeNodeId && timelineData.find(t => t.id === activeNodeId)?.relatedIds.includes(item.id);
      const isPulsing = !!pulseEffect[item.id];
      
      let nodeClass = "rt-node";
      if (isExpanded) nodeClass += " expanded";
      else if (isRelated) nodeClass += " related";
      
      const nodeEl = document.createElement("div");
      nodeEl.className = nodeClass;
      nodeEl.style.transform = `translate(${x}px, ${y}px)`;
      nodeEl.style.zIndex = isExpanded ? 200 : zIndex;
      nodeEl.style.opacity = isExpanded ? 1 : opacity;
      
      nodeEl.innerHTML = `
        ${isPulsing ? `<div class="rt-node-pulse" style="width:${item.energy*0.5+40}px; height:${item.energy*0.5+40}px; left:-${(item.energy*0.5)/2}px; top:-${(item.energy*0.5)/2}px;"></div>` : ''}
        <div class="rt-icon-wrapper">
          <i data-lucide="${item.icon}" style="width:16px;height:16px;"></i>
        </div>
        <div class="rt-node-title">${item.title}</div>
        ${isExpanded ? renderCard(item) : ''}
      `;
      
      nodeEl.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleItem(item.id);
      });
      
      nodesContainer.appendChild(nodeEl);
    });
    
    // Re-initialize Lucide icons for new DOM elements
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function renderCard(item) {
    let statusClass = "status-" + item.status;
    let statusText = item.status === "completed" ? "COMPLETE" : (item.status === "in-progress" ? "IN PROGRESS" : "PENDING");
    
    let relatedHtml = "";
    if (item.relatedIds.length > 0) {
      const btns = item.relatedIds.map(rid => {
        const rItem = timelineData.find(i => i.id === rid);
        return `<button class="rt-related-btn" data-id="${rid}">${rItem.title} <i data-lucide="arrow-right" class="rt-sm-icon"></i></button>`;
      }).join("");
      
      relatedHtml = `
        <div class="rt-card-section">
          <div class="rt-card-section-title"><i data-lucide="link" class="rt-sm-icon"></i> Connected Nodes</div>
          <div class="rt-related-btns">${btns}</div>
        </div>
      `;
    }
    
    return `
      <div class="rt-card" onclick="event.stopPropagation()">
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

  function centerViewOnNode(nodeId) {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    rotationAngle = 270 - targetAngle;
  }

  function toggleItem(id) {
    if (expandedItems[id]) {
      // Close it
      expandedItems = {};
      activeNodeId = null;
      pulseEffect = {};
      autoRotate = true;
    } else {
      // Open it
      expandedItems = { [id]: true };
      activeNodeId = id;
      autoRotate = false;
      
      const rIds = timelineData.find(t => t.id === id).relatedIds;
      pulseEffect = {};
      rIds.forEach(rid => pulseEffect[rid] = true);
      
      centerViewOnNode(id);
    }
    renderNodes();
    attachRelatedListeners();
  }

  function attachRelatedListeners() {
    document.querySelectorAll('.rt-related-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleItem(parseInt(btn.getAttribute('data-id')));
      });
    });
  }

  container.addEventListener("click", (e) => {
    if (e.target.closest('.rt-card') || e.target.closest('.rt-icon-wrapper')) return;
    expandedItems = {};
    activeNodeId = null;
    pulseEffect = {};
    autoRotate = true;
    renderNodes();
  });

  // Animation Loop
  function tick() {
    if (autoRotate) {
      rotationAngle = (rotationAngle + 0.2) % 360;
      renderNodes();
    }
    requestAnimationFrame(tick);
  }
  
  // Initial render
  renderNodes();
  requestAnimationFrame(tick);
});
