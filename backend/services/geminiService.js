const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const isMock = !apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.startsWith('your_');

let genAI = null;
let model = null;

if (!isMock) {
    try {
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });
    } catch (e) {
        console.error("Failed to initialize Gemini AI model:", e);
    }
}

const generateMockData = (title, attributes) => {
    const mockDescription = `Experience the ultimate performance with our new ${title}. ${attributes || 'Designed with premium materials, this product offers unmatched durability and sleek aesthetics for everyday use.'} Engineered to elevate your standards.`;
    const mockSeoTags = `${title.toLowerCase().split(' ').join(', ')}, premium quality, buy ${title.toLowerCase()}, trending`;
    const mockMarketingCaption = `Upgrade your lifestyle with the all-new ${title}! ✨ Premium quality, designed for you. Get yours today! 🚀`;
    return {
        description: mockDescription,
        seoTags: mockSeoTags,
        marketingCaption: mockMarketingCaption
    };
};

const getMockSuggestions = () => {
    return [
        "Bundle 'Wireless ANC Headphones' with accessory products for a 15% discount to boost average order value.",
        "Promote Electronics category products via email marketing as it represents 60% of this month's revenue.",
        "Reorder top-selling inventory immediately; 5 items are currently below the low stock threshold of 10 units."
    ];
};

exports.generateProductContent = async (title, attributes) => {
    if (isMock || !model) {
        return generateMockData(title, attributes);
    }

    try {
        const prompt = `You are an expert e-commerce copywriter and SEO specialist. Create a product description, SEO tags, and a marketing caption for a product named "${title}" with the following attributes/details: "${attributes}".
        Return a JSON object with the following keys: "description" (string), "seoTags" (comma separated string), "marketingCaption" (string).`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini API Error in generateProductContent:", error.message || error);
        return {
            ...generateMockData(title, attributes),
            warning: "Using simulated response: Gemini API issue."
        };
    }
};

exports.generateSalesSuggestions = async (stats) => {
    if (isMock || !model) {
        return { suggestions: getMockSuggestions() };
    }

    try {
        const prompt = `Based on the following store performance data:
        - Monthly Revenue: $${stats.revenue || 0}
        - Total Products: ${stats.totalProducts || 0}
        - Low Stock Items Count: ${stats.lowStockCount || 0}
        Provide 3 short, actionable sales suggestions to improve revenue and manage inventory.
        Return a JSON object with the key "suggestions" containing an array of 3 strings.`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini API Error in generateSalesSuggestions:", error.message || error);
        return {
            suggestions: getMockSuggestions(),
            warning: "Using simulated response: Gemini API issue."
        };
    }
};
