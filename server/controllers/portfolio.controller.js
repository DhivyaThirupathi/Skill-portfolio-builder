const Portfolio = require('../models/portfolio.model');

// Create a new portfolio
exports.createPortfolio = async (req, res, next) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    const savedPortfolio = await newPortfolio.save();
    
    res.status(201).json({
      success: true,
      data: savedPortfolio,
      message: 'Portfolio created successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }
    next(error);
  }
};

// Get all portfolios
exports.getAllPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find().sort({ updatedAt: -1 });
    
    res.status(200).json({
      success: true,
      data: portfolios,
      count: portfolios.length
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific portfolio by ID
exports.getPortfolioById = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid portfolio ID format'
      });
    }
    next(error);
  }
};

// Update a portfolio
exports.updatePortfolio = async (req, res, next) => {
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPortfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedPortfolio,
      message: 'Portfolio updated successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid portfolio ID format'
      });
    }
    next(error);
  }
};

// Delete a portfolio
exports.deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid portfolio ID format'
      });
    }
    next(error);
  }
};