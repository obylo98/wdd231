import { searchAndDisplay } from './display.js';

const filterGroup = document.getElementById('filter-group');
const searchInput = document.getElementById('searchInput');
let selectedFilters = {}; // Store selected filters globally

// Update filters based on checkbox state
filterGroup.addEventListener('change', () => {
    selectedFilters = {};
    document.querySelectorAll('.filter-checkbox:checked').forEach(checkbox => {
        const { name, value } = checkbox;
        if (!selectedFilters[name]) selectedFilters[name] = [];
        selectedFilters[name].push(value);
    });
    // Call search with the updated filters
    searchAndDisplay(searchInput.value, selectedFilters);
});
