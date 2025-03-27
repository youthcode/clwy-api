const express = require('express');
const router = express.Router();
const { Article } = require('../../models');
const { Op } = require('sequelize');
const { NotFoundError, success, } = require('../../utils/response');

/**
 * 查询文章详情
 * GET /admin/articles/:id
 */
router.get('/:id', async function (req, res) {
    try {
        const article = await getArticle(req);

        success(res, '查询文章成功', { article });
        
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

/**
 * 创建文章
 * POST /admin/articles
 */
router.post('/', async function (req, res) {
    try {
        const body = filterBody(req);

        const article = await Article.create(body);

        success(res, '创建文章成功。', { article }, 201);

    } catch(error) {
        // res.json({ error });

        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);

            res.status(400).json({
                status: false,
                message: '请求参数错误。',
                errors
            });
        } else {
            res.status(500).json({
                status: false,
                message: '创建文章失败。',
                errors: [error.message]
            });          
        }
    }
});

/**
 * 删除文章
 * DELETE /admin/articles/:id
 */
router.delete('/:id', async function (req, res) {
    try {
        const article = await getArticle(req);

        await article.destroy();

        success(res, '删除文章成功。');

    } catch (error) {
        res.status(500).json({
            status: false,
            message: '删除文章失败。',
            errors: [error.message]
        })
    }
})

/**
 * 更新文章
 * PUT /admin/articles/:id
 */
router.put('/:id', async function (req, res) {
    try {
        const article = await getArticle(req);
        const body = filterBody(req);

        await article.update(body);

        success(res, '更新文章成功。', { article });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: '更新文章失败。',
            errors: [error.message]
        })
    }
});

/**
 * 获取文章列表
 * GET /admin/articles
 */
router.get('/', async function(req, res) {
    try {
        const query = req.query;

        const currentPage = parseInt(query.currentPage) || 1;
        const pageSize = parseInt(query.pageSize) || 10;

        const offset = (currentPage - 1) * pageSize;

        const condition = {
            order: [['id', 'DESC']],
            limit: pageSize,
            offset: offset
        };

        if (query.title) {
            condition.where = {
                title: {
                    [Op.like]: `%${query.title}%`
                }
            }
        }

        const { count, rows } = await Article.findAndCountAll(condition);

        success(res, '获取文章列表成功。', {
            articles: rows,
            pagination: {
                total: count,
                currentPage,
                pageSize,
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: '获取文章列表失败。',
            errors: [error.message]
        })
    }
})

function filterBody(req) {
    return {
        title: req.body.title,
        content: req.body.content,
    };
}

/**
 * 公共方法:查询当前文章
 */
async function getArticle(req) {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
        throw new NotFoundError('文章不存在。');
    }

    return article;
}

module.exports = router;