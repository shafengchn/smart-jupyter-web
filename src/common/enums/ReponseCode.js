export default {
	/**
	 * 请求成功
	 */
	SUCCESS: 0,

	/**
	 * 操作失败
	 */
	FAILED: -1,

	/**
	 * 参数信息不完整
	 */
	PARAM_INCOMPLETE: 10000,

	/**
	 * 不合法的参数
	 */
	PARAM_INVALID: 10001,

	/**
	 * 名称或值不能重复
	 */
	NAME_VALUE_EXIST: 10002,
	
	/**
	 * 存在子项值
	 */
	HAS_CHILD_VALUE: 10003,

	/**
	 * 未找到可执行方法
	 */
	METHOD_NOT_FOUND: 10004,

	/**
	 * 资源不存在或已删除
	 */
	NOT_EXISTS_OR_REMOVED: 10005,

	/**
	 * 无效的令牌
	 */
	TOKEN_INVALID: 40001,
}