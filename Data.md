Categories：分类表

id（编号）: integer，主键，不为null，无符号，自增 
name（名称）：varchar，不为null
rank（排序）：integer，无符号，不为null，默认值：1



Courses：课程表

id（编号）: integer，主键，不为null，无符号，自增 
categoryId（分类 ID）：integer，无符号，不为null，index索引
userId（用户Id）：integer，无符号，不为null，index索引
name（名称）：varchar，不为null
image（课程图片）：varchar
recommended（是否推荐课程）: boolean，不为null，默认false，index索引
introductory（是否入门课程）：boolean，不为null，默认false，index索引
content（课程内容）：text
likesCount（课程的点赞数量）：integer，无符号，不为null，默认0
chaptersCount（课程的章节数量）: integer，无符号，不为null，默认0



