const express = require('express');
const router = express.Router();
const { Article } = require('../../models');

router.get('/', async function(req, res) {
    try {
        const condition = {
            order: [['id', 'DESC']]
        };
        
        const articles = await Article.findAll(condition);
    
        res.json({
            status: true,
            message: '获取文章列表成功',
            data: {
                articles
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: '获取文章列表失败。',
            data: {
                error: [error.message]
            }
        });
    }
    
});

router.get('/:id', async function (req, res) {
    try {
        const { id } = req.params;

        const article = await Article.findByPk(id);

        if (article) {
            res.json({
                status: true,
                message: '查询文章成功。',
                data: {
                    article
                }
            });
        } else {
            res.status(404).json({
                status: false,
                message: '文章不存在。',
            });
        }
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: '查询文章失败。',
            data: {
                error: [error.message]
            }
        });
    }
    
});

module.exports = router;